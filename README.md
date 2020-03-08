# spotify-ts-api

_semi-aggressively typed API library for interfacing with the Spotify Web API._

_Status: initial boilerplate / placeholder_

## Note

- Node.js only.
- Not tested. I do not know how to write tests in JavaScript / TypeScript yet
  - i.e. not production ready at all
- A lot of the interfaces file can be consolidated

I wonder if the type files in this repo could be transpiled into C# source code though...

## Roadmap

- v1.0.0: the library will return/relay pure JSON objects as defined by the API
- v2.0.0: the library will cast the JSON objects into a class
  - of which the objects will have all the properties of the JSON object + helper functions
  - similar to a "database" API
