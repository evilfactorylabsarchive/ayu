> ### Disclaimer
> 
> wtf just got similar project like this
> check it [here](https://github.com/vasanthv/jsonbox). I don't have energy
> anymore to continue this after looking to that project.

> Ideas are cheap, and execution is worth millions.
> will archive this repo and delete it after 40 days.

# ayu

prototype your project, faster. ayu will _mock_ your API Endpoint response
as you expected.

## Motivation

Per August 2019 I don't code _much_ anymore, this toy was my weekend project
to keep me code and contribute to OSS community especially in Indonesia.

## Why?

As (former) Frontend Engineer, rarely I am writing backend code. Most Web App
is relying on API endpoint, and so I. Writing "no-backend" services––like using Hasura,
Parse or Prisma––sometimes not suitable for me.

Maybe because my app is doesn't need GraphQL. All I need is "request" to some API endpoint via REST,
than got the response for my UI. This is why we create this.

## Overiew

Imagine you want a data of your users. So you design it like this:

```typescript
type Cuid = string
type Timestamp = number

enum UserLevel {
  BLOCKED_USER = 0,
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3
}

interface User {
  id: Cuid
  name: string
  username: string
  email: string
  phoneNumber: number
  deviceIds: [Cuid]
  logId: Cuid
  level: UserLevel
  lastLogin: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
  isDeleted: boolean
  isLocked: boolean
}

```

The object for example like this:

```json
{
  "meta": {
    "id": "h300deh",
    "token": "fb4b1a32f5798fb291608a035c1e7382",
    "timestamp": 1567715385233
  },
  "data": [
    {
      "id": "ck073klf3000001s812p3257m",
      "name": "Fariz",
      "username": "faultable",
      "email": "faultable@mailinator.com",
      "phoneNumber": 086663313377,
      "deviceIds": ["ck073ku2q000001pb9unvauhq"],
      "logId": "ck073lops000001ml88cgenyg",
      "level": 2,
      "lastLogin": 1567712486016,
      "createdAt": 1567712486016,
      "updatedAt": 1567712486016,
      "isDeleted": false,
      "isLocked": false,
    }
  ]
}
```

All you need is write it like that! After that you will get some unique endpoint, like this for example:

```
https://tinker.evilfactory.id/4a00ovg
```

Also you will get 5 verbs for that:

- GET
- POST
- PATCH
- PUT
- DELETE

For non-GET request, you will get some "token" that must be included in every request or you will get `403` status code.

```bash
$ curl https://tinker.evilfactory.id/4a00ovg

HTTP/2 200
content-type: application/json; charset=utf-8
vary: Accept-Encoding
x-dns-prefetch-control: off
x-frame-options: SAMEORIGIN
x-download-options: noopen
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
etag: W/"4000-Jisp3AlGstXsEHyx+ItRO0tgbN0"
strict-transport-security: max-age=15552000; includeSubDomains

[ { "id": "ck073klf3000001s812p3257m", "name": "Fariz", "username": "faultable", "email": "faultable@mailinator.com", "phoneNumber": 086663313377, "deviceIds": ["ck073ku2q000001pb9unvauhq"], "logId": "ck073lops000001ml88cgenyg", "level": 2, "lastLogin": 1567712486016, "createdAt": 1567712486016, "updatedAt": 1567712486016, "isDeleted": false, "isLocked": false, } ]
```

## Design

This project is only powered by single redis instance + fastify web server in 1gb RAM + 1 core vCPU server,
so please use it carefully and responsibly :))

```
   [client]                   [server]                  [redis]
GET /4a00ovg ---->            get:4a00ovg      ---->

                   <---JSON-- 20x/40x/50x ----
```

We don't guarantee your data persistence, So just use this services in your development environment.

## Contribute

Feedback, Bug fix, feature requests are always welcome!

## Privacy

We don't store anything except "hits" and "updated" timestamp. That data is used to "cleaning up" unused endpoint
so we can keep the FS thin.

## ToS

- Be nice & use with responsible

---

This project is brought to you by [evilfactorylabs](https://evilfactory.id), under MIT license.
