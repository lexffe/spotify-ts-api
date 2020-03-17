# spotify-ts-api

_semi-aggressively typed API library for interfacing with the Spotify Web API._

_Status: initial boilerplate / placeholder_

## General Note

- I have absolutely 0 idea on what I am doing.
  - Anti-patterns everywhere.
- Node.js only.
  - Technically this would work in a browser if replacng the `http` and `url` module with something like `axios`, but I cannot be bothered.
- Unnecessarily verbose on the return types.
- Not tested. I do not know how to write tests in JavaScript / TypeScript yet
  - i.e. not production ready at all
- A lot of the interfaces file can be consolidated

I wonder if the interface files in this repo could be transpiled into C# source code though...

## How-to use

TBD
<!--

Before you start, you have to provide your own user Bearer token, as you would need to get the OAuth token through the browser. (Automating this part would take quite sometime, involving messing around with headless browsers...)

There is a pre-written callback server (and callback function) you could invoke in the `helpers` folder.

Example available at `example/index.ts` ([here]())

-->

## TODO

- Add `winston` logger.

## Roadmap

- v1.0.0: the library will return/relay pure JSON objects as defined by the API
- v2.0.0: the library will cast the JSON objects into a class
  - of which the objects will have all the properties of the JSON object + helper functions
  - similar to a "database" API
