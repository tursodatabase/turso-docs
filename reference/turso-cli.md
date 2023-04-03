# Turso CLI

The Turso CLI is the tool provided for managing Turso databases. If you are
getting started for the first time, we recommend following along with the
[getting started tutorial], which walks you through the process of installation,
authentication, creating a database, replicating it, querying it, and destroying
it.

## Installation

The Turso CLI has two installation options.

### Homebrew (macOS and Linux)

There is a Homebrew formula that's installed with the following command:

```bash
$ brew install chiselstrike/tap/turso
```

The formula includes an executable with autocompletion scripts for bash, fish,
and zsh.

### Direct install

If you prefer the manage the installation directly, run the following command to
execute a shell script that downloads and installs the CLI:

```bash
$ curl -sSfL https://get.tur.so/install.sh | bash
```

The CLI is installed in a directory called `.turso` in your home directory. The
shell script will attempt to add that to your shell’s PATH configuration. You
will need to start a new shell to see the change, or add it manually to the
current shell.

### Verify the installation

Run the following command to make sure the Turso CLI is in your PATH:

```bash
$ turso --version
```

## Logging in to the CLI

The Turso CLI requires a GitHub account for authentication. You must log in to
be able to work with databases. All databases created while logged in with an
account belong to that account and are controlled by it. There is currently no
way to share database access with other accounts.

Use the command `turso auth login` to start the login process. The command
launches your default browser and prompts you to log in with GitHub. The first
time, you are asked to grant the GitHub Turso app some permissions to your
account. Accept this in order to continue. (If desired, you can revoke those
permissions later in the GitHub settings for your account.)

When the authentication process finishes, you are issued an authentication
token. This token identifies your account to Turso. The token expires after one
week; afterward, you must log in again to get a new token.

### Running locally

If you are running the CLI on your local machine, the CLI receives this token as
part of the login flow and [stores it locally](#local-storage) for future use.

### Running remotely

If you are running the CLI on a remote machine, it might not be able to launch a
browser. In that case, use the URL provided by `turso auth login` with a browser
you have access to in order to authenticate. The process ends with a page
showing your token. You can use this token with the remote CLI in two ways.

#### The `TURSO_API_TOKEN` environment variable

You can set the environment variable `TURSO_API_TOKEN` in a shell before running
commands. For example:

```bash
$ export TURSO_API_TOKEN=[YOUR-TOKEN-STRING]
$ turso db locations
```

#### The `--token` flag on the command line

You can pass the token string on the command line with the `--token` flag:

```bash
$ turso --token [YOUR-TOKEN] db locations
```

## Authentication tokens for client access

[Client access] to Turso from your application requires an authentication token.
This token should be long-lived, and different from the one you get when you log
in to the CLI. To get an auth token suitable for your app that doesn’t expire,
run the following command:

```bash
$ turso db tokens create $DBNAME --expiration none
```

`$DBNAME` is the name of your database. This command outputs a string that you
can use in the configuration object passed to the SDK along with the database
URL.

Treat this string as a secret only for use by your application backend. If this
token is ever leaked, you can invalidate all prior tokens for your database with
the following command:

```bash
$ turso db tokens invalidate $DBNAME
```

This command restarts all of your database instances in order to use a new
signing key for any new tokens you create afterward.

## Inspect database usage

Total database usage, measured for the purpose of billing, is aggregated across
all [logical databases] associated with an account. The billable metrics are:

- Total amount of storage
- Number of rows read

To see a summary for your account, use the following command:

```bash
$ turso account show
```

You can get more detailed data about the current usage of a logical database
using the following command:

```bash
$ turso db inspect $DBNAME
```

This reports the total space occupied by all user-created tables and indexes.
For a more detailed breakdown by location, table, and index, pass the
`--verbose` flag.

:::info

During the public beta, Turso is [free to use with limits]. In the future, you
will be billed according to your usage.

:::

## Get help

The CLI offers help for all commands and subcommands. Run `turso help` to get a
list of all commands.  Use the `--help` flag to get help for a specific command
or subcommand. For example: `turso db --help`.

## Local storage

The CLI stores persistent data, including your JWT, in a file on your computer.
On macOS, the containing folder is `$HOME/Library/Application Support/turso`. On
linux, it’s `$HOME/.turso`. It is safe to delete this folder, since it can be
restored by logging in to the CLI again.


[Client access]: ./client-access
[getting started tutorial]: /tutorials/get-started-turso-cli
[free to use with limits]: /beta-limits
