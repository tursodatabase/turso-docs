# libSQL database URLs

Throughout this documentation, the [Turso CLI], and the [libSQL client
libraries], you will notice examples of URLs that start with `libsql://`. These
URLs are recognized by libSQL and Turso tools with the following meaning.

## Database endpoint identification

A `libsql` URL identifies a libSQL database accessible through [sqld] (libSQL
server mode). Databases managed by Turso provide two categories of URLs:

### Logical database URL

This URL connects to an [instance] of the database closest to the machine making
the connection. Most of the time, you will want to use this URL as shown in the
output of `turso db list`.

### Database instance URL

This URL always connects to a specific [instance] of a Turso database. You may
want to use this in order to bypass the automatic routing provided by the
logical database URL. Instance URLs appear for each instance in the output of
`turso db show`.

## WebSockets implementation

A libsql URL is understood by [libSQL client libraries] to use a custom
WebSocket protocol to manage round trip communications with a libSQL database.

## HTTP URLs

If your runtime environment doesn’t support WebSockets, or a client library is
not available for your preferred language, you can replace the `libsql` scheme
with `https` to invoke a stateless HTTP API similar to the WebSocket protocol.
Documentation for this protocol is forthcoming.


[Turso CLI]: /reference/turso-cli
[libSQL client libraries]: /reference/client-access/
[sqld]: https://github.com/libsql/sqld/
[instance]: /concepts#instance
