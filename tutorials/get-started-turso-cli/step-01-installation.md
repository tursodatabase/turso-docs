---
description: Installation of the Turso CLI using homebrew or script.
keywords:
  - turso
  - cli
  - tutorial
  - installation
  - homebrew
  - script
---

# Step 1: Installation

The Turso CLI has two installation options: Homebrew and scripted install.

## Option 1: Homebrew (macOS and Linux)

There is a Homebrew formula available that’s installed with the following
command:

```bash
brew install tursodatabase/tap/turso
```

The formula includes an executable with autocompletion scripts for bash, fish,
and zsh.

## Option 2: Scripted install (macOS, Linux, and WSL)

If you can't use Homebrew, run the following command to execute a shell script
that installs the CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

:::info

If you are on Windows, please make sure you have installed [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). You run the scripted install within a WSL shell, which you can start by running the `wsl` command in PowerShell, for example.

:::

The CLI is installed in a directory called `.turso` in your home directory. The
shell script will attempt to add that to your shell’s PATH. You will need to
start a new shell to see the change, or add it manually to the current shell by
running the `source` command printed by the installer.

## Verify the installation

Run the following command to make sure the Turso CLI is in your PATH:

```bash
turso --version
```

You will need Turso CLI version 0.85.0 or later for this tutorial.
