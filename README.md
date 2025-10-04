[![CircleCI][circleci-badge]][circleci]
[![Renovate][renovate-badge]][renovate]
[![npm][npm-badge]][npm]

[circleci]: https://circleci.com/gh/matzkoh/niconizer
[circleci-badge]: https://circleci.com/gh/matzkoh/niconizer.svg?style=shield
[renovate]: https://renovatebot.com/
[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen
[npm]: https://www.npmjs.com/package/niconizer
[npm-badge]: https://img.shields.io/npm/v/niconizer.svg

# niconizer

## Run and build locally
Involves some hacks to work on windows

```ps1
pnpm i
pnpm run build
pnpm start
wscat -c ws://localhost:25252 -x "hi"
```

## What is this

_niconizer_ is a simple desktop application that has two functionalities below.

- Overlay short HTML content directly on the screen.
  - The content flows from right to left on the screen and disappears.
- Local WebSocket server to receive the content.

It can be used in combination with clients that send contents.

## Getting started

### Installation

```bash
$ npm i -g niconizer
$ niconizer
```

Then the WebSocket server starts up on your computer and listens for connections.

Available clients are in the [section](#clients) bellow.

## Tray Icon Menu

- `Start`
  - Open a transparent window that shows the content.
- `Stop`
  - Close the window and pause displaying the content.
- `Quit`
  - Quit niconizer.

## Clients

- Slack
  - [niconizer-slack](https://github.com/matzkoh/niconizer-slack)
- Twitter
  - [niconizer-tweetdeck](https://github.com/matzkoh/userscripts/tree/master/packages/niconizer-tweetdeck)

## Develop client

**Currently, no authentication is implemented.**

---

### Node.js

```js
// WebSocket implementation for nodejs
const WebSocket = require("ws");

// niconizer server
const ws = new WebSocket("ws://localhost:25252/");

// any html content
ws.send("<b>Hello, world!</b>");
```

### Browser (assuming use from userscripts such as Greasemonkey)

```js
const ws = new WebSocket("ws://localhost:25252/");

ws.send("<b>Hello, world!</b>");
```

### Shell Script

```sh
wscat -c ws://localhost:25252 -x "$(jq -r '.name' package.json)"
```

## Contributing

Lint, Format, Build

```bash
$ npm run build
```

Build, Run

```bash
$ npm start
```

Package

```bash
$ npm run package
```
