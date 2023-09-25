
# Setup guide

## Obtain a libSQL server binary

This guide assumes that you have a libSQL server binary to work with. Read the
[libSQL server BUILD-RUN doc] on GitHub to discover your options for building or
downloading libSQL server.

The examples in this guide assume that the libSQL server binary `sqld` is in
your shell PATH, but that is not a requirement to use it effectively.

## Required libSQL server configurations

libSQL server operates with three required configurations, each with a default:

- Mode (standalone, primary, or replica)
  <br/>Default: standalone
- Network address for HTTP clients (IP address and port)
  <br/>Default: IP address 127.0.0.1 port 8080
- Database directory path on a writable filesystem
  <br/>Default: "data.sqld" in the current directory

Network access for HTTP clients is configured with the command line flag
`--http-listen-addr [addr]`, where `addr` is specified using IP address and port
formatted as `IP:PORT`.

The database directory path is configured with the command line flag `--db-path [path/to/dir]`.

Mode is discussed further in the sections below.

## Running libSQL server

### Run a libSQL server instance in standalone mode

Running the `sqld` executable with no arguments starts libSQL server with the
default configurations. To provide those defaults explicitly on the command
line:

```bash
sqld \
    --http-listen-addr 127.0.0.1:8080 \
    --db-path data.sqld
```

See the section [Querying libSQL server](#querying-libsql-server) below for
options to query the running server using the URL for HTTP clients.

### Run multiple libSQL server instances with replication

:::note

This section shows how to run separate primary and replica server instances on
the same local machine. This requires the configuration of different ports and
database directories for both instances. In a production environment, where each
instance would normally be deployed to different machines, this is not
necessary.

:::

The examples in the remainder of this page assume the following shell variables
have been established, with configurations for both a primary and replica
instance:

```bash
export SQLD_PRIMARY_HTTP_ADDR=127.0.0.1:8080
export SQLD_PRIMARY_GRPC_ADDR=127.0.0.1:5000
export SQLD_PRIMARY_DB_PATH=primary.sqld

export SQLD_REPLICA1_HTTP_ADDR=127.0.0.1:8081
export SQLD_REPLICA1_DB_PATH=replica1.sqld
```

:::note

Only the primary instance must listen on a network address (the “GRPC” address), and the replicas must connect to it. This guide refers to these socket connections between primary and replica as “GRPC replication channels”.

:::

To start the primary instance, use the `--grpc-listen-addr` command line flag to specify the network address  for the replica channel:

```bash
sqld \
  --http-listen-addr $SQLD_PRIMARY_HTTP_ADDR \
  --grpc-listen-addr $SQLD_PRIMARY_GRPC_ADDR \
  --db-path $SQLD_PRIMARY_DB_PATH
```

To start the replica instance on the same machine, use the `--primary-grpc-url`
command line flag to indicate the replication channel to the primary (specified
using an HTTP URL):

```bash
sqld \
  --http-listen-addr $SQLD_REPLICA1_HTTP_ADDR \
  --primary-grpc-url http://$SQLD_PRIMARY_GRPC_ADDR \
  --db-path $SQLD_REPLICA1_DB_PATH
```

You can [query](#querying-libsql-server) each instance separately using its
client URL. Read-only queries are serviced by each instance.  Queries that write
data on a replica get forwarded to the primary before getting replicated back to
all replicas. Assuming fast network speeds, clients on each instance always
should see the same tables and data.

### Secure the GRPC replication channel using TLS

By default, the replication channels between primary and replica instances are
not secure. In an environment where security between instances is required, you
can configure the channels to use TLS.

:::note

The examples here use temporary certificates for development purposes only. In a production environment, you should use certificates signed in a way that suits your needs.

:::

You can create certificates for development using the provided Python script. To
use it, run the following shell commands:

```bash
$ pip install cryptography
$ python gen_certs.py
```

The output of the script indicates the files created for the certificate authority, client, and server in the current directory:

```
stored cert 'ca' into 'ca_cert.pem'
stored private key 'ca' into 'ca_key.pem'
stored cert 'server' into 'server_cert.pem'
stored private key 'server' into 'server_key.pem'
stored cert 'client' into 'client_cert.pem'
stored private key 'client' into 'client_key.pem'
```

Note the expiration date on the certificates in the output.

With these files, you can start the primary instance with additional flags to add TLS to the GRPC replication channel:

```bash
libsql-server \
  --http-listen-addr $SQLD_PRIMARY_HTTP_ADDR \
  --grpc-listen-addr $SQLD_PRIMARY_GRPC_ADDR \
  --db-path $SQLD_PRIMARY_DB_PATH \
  --grpc-tls \
  --grpc-ca-cert-file ca_cert.pem \
  --grpc-cert-file server_cert.pem \
  --grpc-key-file server_key.pem
```

And start a replica instance similarly:

```bash
libsql-server \
  --http-listen-addr $SQLD_REPLICA1_HTTP_ADDR \
  --primary-grpc-url http://$SQLD_PRIMARY_GRPC_ADDR \
  --db-path $SQLD_REPLICA1_DB_PATH \
  --primary-grpc-tls \
  --primary-grpc-ca-cert-file ca_cert.pem \
  --primary-grpc-cert-file client_cert.pem \
  --primary-grpc-key-file client_key.pem
```

### Querying libSQL server

Once you have a running instance, you can query it using the following tools:

- [The Turso CLI]
- [The libSQL client SDKs]

You can use the Turso CLI to start a shell that queries an instance running
locally on the default IP address and port using a URL:

```bash
turso db shell http://127.0.0.1:8080
```

You can use the JavaScript client library to query it from your code by
providing it the URL:

```ts
const client = createClient({
    url: "http://127.0.0.1:8080"
})
// Now use client.execute() and other APIs to query libSQL server
```

The client libraries for other languages have similar means of providing the
URL.


[libSQL server BUILD-RUN doc]: https://github.com/libsql/sqld/blob/main/docs/BUILD-RUN.md
[The Turso CLI]: /reference/turso-cli
[The libSQL client SDKs]: /libsql/client-access
