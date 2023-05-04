---
description: API to get all database locations supported by Turso.
keywords:
  - turso
  - platform
  - rest
  - api
  - database
  - location
---

# Get all supported locations

## Summary

**Description**:

Returns all supported database instance deployment locations.

The three letter codes in the response can be used wherever a "location code" is
accepted by the [Database instance API].

**Requirements**:

- The caller must provide an [authentication] token.

**Analogous CLI command**: `turso db locations`

:::info

The Turso CLI suggests a default location near the user, which is not part of
this API. The CLI uses https://region.turso.io/ to get the most most suitable
default.

:::

**Path**: `/v1/locations`

**Method**: `GET`

## Output

**JSON body properties**:

| Property | Description |
| --- | --- |
| `locations` | An object whose properties are locations codes and values are display names of those locations |

## Example

```bash
curl \
  -X GET \
  -H "Authorization: Bearer $TURSO_TOKEN" \
  "$TURSO_BASE_URL/v1/locations"
```

```json
{
  "locations": {
    "ams": "Amsterdam, Netherlands",
    "arn": "Stockholm, Sweden",
    "bog": "Bogotá, Colombia",
    "bos": "Boston, Massachusetts (US)",
    "cdg": "Paris, France",
    "den": "Denver, Colorado (US)",
    "dfw": "Dallas, Texas (US)",
    "ewr": "Secaucus, NJ (US)",
    "fra": "Frankfurt, Germany",
    "gdl": "Guadalajara, Mexico",
    "gig": "Rio de Janeiro, Brazil",
    "gru": "São Paulo, Brazil",
    "hkg": "Hong Kong, Hong Kong",
    "iad": "Ashburn, Virginia (US)",
    "jnb": "Johannesburg, South Africa",
    "lax": "Los Angeles, California (US)",
    "lhr": "London, United Kingdom",
    "mad": "Madrid, Spain",
    "mia": "Miami, Florida (US)",
    "nrt": "Tokyo, Japan",
    "ord": "Chicago, Illinois (US)",
    "otp": "Bucharest, Romania",
    "qro": "Querétaro, Mexico",
    "scl": "Santiago, Chile",
    "sea": "Seattle, Washington (US)",
    "sin": "Singapore, Singapore",
    "sjc": "San Jose, California (US)",
    "syd": "Sydney, Australia",
    "waw": "Warsaw, Poland",
    "yul": "Montreal, Canada",
    "yyz": "Toronto, Canada"
  }
}
```


[Database instance API]: ../instance
[authentication]: /reference/platform-rest-api/#authentication
