#!/usr/bin/env python3
"""
Sync SQL reference docs from the turso submodule into the docs site.

This script:
1. Copies .mdx files from turso/docs/sql-reference/ -> sql-reference/
2. Rewrites internal links (/docs/sql-reference/ -> /sql-reference/)
3. Updates docs.json with auto-generated SQL Reference navigation
"""

import json
import os
import re
import shutil
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_DIR = os.path.join(REPO_ROOT, "turso", "docs", "sql-reference")
DEST_DIR = os.path.join(REPO_ROOT, "sql-reference")
DOCS_JSON = os.path.join(REPO_ROOT, "docs.json")

LINK_REWRITE = ("/docs/sql-reference/", "/sql-reference/")

# Preferred ordering for navigation. Files not listed here are appended
# alphabetically at the end of their group.

TOP_LEVEL_ORDER = [
    "compatibility",
    "data-types",
    "expressions",
]

STATEMENTS_ORDER = [
    "create-table",
    "alter-table",
    "create-index",
    "create-view",
    "create-materialized-view",
    "create-trigger",
    "create-type",
    "create-virtual-table",
    "drop-table",
    "drop-index",
    "drop-view",
    "drop-trigger",
    "drop-type",
    "select",
    "insert",
    "update",
    "delete",
    "replace",
    "upsert",
    "explain",
    "transactions",
    "attach-database",
    "detach-database",
    "analyze",
]

FUNCTIONS_ORDER = [
    "scalar",
    "aggregate",
    "window",
    "math",
    "date-time",
    "json",
    "vector",
    "fts",
]

BOTTOM_LEVEL_ORDER = [
    "extensions",
    "pragmas",
    "experimental-features",
]

SQL_REFERENCE_GROUP_NAME = "SQL Reference"
TURSO_DB_TAB_NAME = "Turso Database (beta)"


def copy_and_rewrite(src_dir: str, dest_dir: str) -> list[str]:
    """Copy .mdx files from src to dest, rewriting internal links.

    Returns list of relative paths (without .mdx extension) of copied files.
    """
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)

    copied = []
    for root, _dirs, files in os.walk(src_dir):
        for filename in files:
            if not filename.endswith(".mdx"):
                continue

            src_path = os.path.join(root, filename)
            rel_path = os.path.relpath(src_path, src_dir)
            dest_path = os.path.join(dest_dir, rel_path)

            os.makedirs(os.path.dirname(dest_path), exist_ok=True)

            with open(src_path, "r") as f:
                content = f.read()

            content = content.replace(LINK_REWRITE[0], LINK_REWRITE[1])

            with open(dest_path, "w") as f:
                f.write(content)

            page_path = os.path.splitext(rel_path)[0]
            copied.append(page_path)

    return copied


def sort_pages(pages: list[str], preferred_order: list[str]) -> list[str]:
    """Sort pages by preferred order, appending unknown pages alphabetically."""
    order_map = {name: i for i, name in enumerate(preferred_order)}
    known = [p for p in pages if p in order_map]
    unknown = sorted([p for p in pages if p not in order_map])
    known.sort(key=lambda p: order_map[p])
    return known + unknown


def build_navigation(copied_files: list[str]) -> dict:
    """Build the SQL Reference navigation group from copied file paths."""
    top_level = []
    statements = []
    functions = []

    for page in copied_files:
        parts = page.split(os.sep)
        if len(parts) == 1:
            top_level.append(parts[0])
        elif parts[0] == "statements":
            statements.append(parts[1])
        elif parts[0] == "functions":
            functions.append(parts[1])

    # Separate into top pages (before subgroups) and bottom pages (after)
    top_pages = sort_pages(
        [p for p in top_level if p in TOP_LEVEL_ORDER or p not in BOTTOM_LEVEL_ORDER],
        TOP_LEVEL_ORDER,
    )
    bottom_pages = sort_pages(
        [p for p in top_level if p in BOTTOM_LEVEL_ORDER],
        BOTTOM_LEVEL_ORDER,
    )
    # Remove any page that ended up in both lists
    bottom_set = set(BOTTOM_LEVEL_ORDER)
    top_pages = [p for p in top_pages if p not in bottom_set]

    statements = sort_pages(statements, STATEMENTS_ORDER)
    functions = sort_pages(functions, FUNCTIONS_ORDER)

    prefix = "sql-reference"
    pages = []

    # Top-level pages first
    for p in top_pages:
        pages.append(f"{prefix}/{p}")

    # Statements subgroup
    if statements:
        pages.append({
            "group": "Statements",
            "pages": [f"{prefix}/statements/{s}" for s in statements],
        })

    # Functions subgroup
    if functions:
        pages.append({
            "group": "Functions",
            "pages": [f"{prefix}/functions/{f}" for f in functions],
        })

    # Bottom-level pages last
    for p in bottom_pages:
        pages.append(f"{prefix}/{p}")

    return {"group": SQL_REFERENCE_GROUP_NAME, "pages": pages}


def update_docs_json(nav_group: dict) -> None:
    """Insert or replace the SQL Reference group in docs.json."""
    with open(DOCS_JSON, "r") as f:
        docs = json.load(f)

    tabs = docs.get("navigation", {}).get("tabs", [])

    turso_tab = None
    for tab in tabs:
        if tab.get("tab") == TURSO_DB_TAB_NAME:
            turso_tab = tab
            break

    if turso_tab is None:
        print(f"Error: Could not find tab '{TURSO_DB_TAB_NAME}' in docs.json", file=sys.stderr)
        sys.exit(1)

    groups = turso_tab.get("groups", [])

    # Replace existing SQL Reference group, or append it
    replaced = False
    for i, group in enumerate(groups):
        if group.get("group") == SQL_REFERENCE_GROUP_NAME:
            groups[i] = nav_group
            replaced = True
            break

    if not replaced:
        groups.append(nav_group)

    turso_tab["groups"] = groups

    with open(DOCS_JSON, "w") as f:
        json.dump(docs, f, indent=2)
        f.write("\n")


def main():
    if not os.path.isdir(SOURCE_DIR):
        print(f"Error: Source directory not found: {SOURCE_DIR}", file=sys.stderr)
        print("Make sure the turso submodule is initialized:", file=sys.stderr)
        print("  git submodule update --init turso", file=sys.stderr)
        sys.exit(1)

    print(f"Copying .mdx files from {SOURCE_DIR} -> {DEST_DIR}")
    copied = copy_and_rewrite(SOURCE_DIR, DEST_DIR)
    print(f"  Copied {len(copied)} files")

    print("Building navigation...")
    nav_group = build_navigation(copied)
    page_count = sum(
        len(entry["pages"]) if isinstance(entry, dict) else 1
        for entry in nav_group["pages"]
    )
    print(f"  {page_count} navigation entries")

    print(f"Updating {DOCS_JSON}...")
    update_docs_json(nav_group)
    print("Done.")


if __name__ == "__main__":
    main()
