---
description: Description of libSQL database URLs used to identify a Turso database and the network protocol.
keywords:
  - turso
  - database
  - libsql
  - url
  - websocket
  - http
---

# libSQL database URLs

Throughout this documentation, the [Turso CLI], and the [libSQL client
libraries], you will notice examples of URLs that start with `libsql://`. These
URLs are recognized by libSQL and Turso tools with the following meaning.

## Database endpoint identification

A `libsql` URL identifies a libSQL database accessible through [sqld] (libSQL
server mode). Databases managed by Turso provide two categories of URLs:

### Logical database URL

This URL connects to an [instance] of the database with the lowest latency to
the machine making the connection. Most of the time, you will want to use this
URL as shown in the output of `turso db list` and `turso db show`.

:::info

Turso depends on the hosting service Fly.io to determine the lowest latency
instance for a client connection. Typically, this will be the geographically
closest instance to the machine running the client, though that may not always
be the case. A client using a logical database URL might connect to different
instances over time depending on how Fly.io observes network latency.

:::

### Database instance URL

This URL always connects to a specific [instance] of a Turso database. You may
want to use this in order to bypass the automatic routing provided by the
logical database URL. Instance URLs appear for each instance in the output of
`turso db show $DBNAME --instance-urls`.

## WebSockets implementation

A libsql URL is understood by [libSQL client libraries] to use a custom
WebSocket protocol to manage round trip communications with a libSQL database.

## HTTP URLs

If your runtime environment doesn’t support WebSockets, or a client library is
not available for your preferred language, you can replace the `libsql` scheme
with `https` to invoke a stateless HTTP API similar to the WebSocket protocol.
When using [sqld] locally, you can use `http` to access it without requiring an
SSL certificate.

Documentation for the libSQL HTTP protocol is forthcoming.


[Turso CLI]: /reference/turso-cli
[libSQL client libraries]: /reference/client-access/
[sqld]: https://github.com/libsql/sqld/
[instance]: /concepts#instance
