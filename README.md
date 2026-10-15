# Vite bundled dev ignores `server.hmr: false`

`vite.config.js` sets `server.hmr: false`. With `experimental.bundledDev`, the dev server still pushes every edit to the open page and makes it reload. Without bundled dev, the same setting stops the pushes.

Reproduced with Vite 8.3.4 on Node 24.

## Setup

```sh
npm install
```

The page counts how many times it has loaded in its tab, so a reload shows on screen.

## Bundled dev

1. `npm run dev`
2. Open http://localhost:5173/. It shows `Page loads in this tab: 1`.
3. Change the message in `src/message.js` and save. Do it again with a different message.

Expected: the page stays at 1 load and still shows `Edit me`, as with HMR off nothing is pushed to it.

Actual: the page reloads on each save. It shows 3 loads and the latest message.

In DevTools → Network → WS, the socket receives, for the two saves:

```
{"type":"bundled-dev-update","changedIds":["src/message.js"],"url":"hmr_patch_0.js","seq":1}
{"type":"full-reload","path":"*"}
{"type":"bundled-dev-update","changedIds":["src/message.js"],"url":"hmr_patch_1.js","seq":1}
{"type":"full-reload","path":"*"}
```

## Unbundled dev, for comparison

1. `npm run dev:unbundled`. The mode only turns `experimental.bundledDev` off; `server.hmr: false` stays.
2. Open http://localhost:5173/ in a new tab, and repeat step 3.

The page stays at 1 load and keeps its first message. The socket receives nothing for either save.
