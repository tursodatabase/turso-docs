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

## macOS instructions

To install the Turso CLI on macOS, we recommend that you use Homebrew:

```bash
brew install tursodatabase/tap/turso
```

The formula includes an executable with autocompletion scripts for bash, fish,
and zsh.

If you don't use Homebrew, you can use the following command to execute a shell script that installs the CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

## Linux instructions

Run the following command to execute a shell script that installs the CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

## Windows instructions

Installing the Turso CLI on Windows requires that you have [WSL installed](https://learn.microsoft.com/en-us/windows/wsl/install). You run the scripted install within a WSL shell.
For example, run the following command in PowerShell to start a WSL shell:

```bash
wsl
```

You can then use the following command to execute a shell script that installs the CLI:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

## Verify the installation

:::info

If you used the scripted installer, the CLI is installed in a directory called `.turso` in your home directory. The
shell script will attempt to add that to your shell’s PATH. You will need to
start a new shell to see the change, or add it manually to the current shell by
running the `source` command printed by the installer.

:::

Run the following command to make sure the Turso CLI is in your PATH:

```bash
turso --version
```

You will need Turso CLI version 0.85.0 or later for this tutorial.
