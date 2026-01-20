# Learning Notes: React CDN Basics (10-basics)

These notes explain why each piece exists in the HTML/JS and how it works together.

## HTML setup (index.html)

- The `<!DOCTYPE html>` triggers standards mode so the browser uses modern layout rules.
- `<meta charset="UTF-8">` appears early so the parser decodes text correctly from the start.
- `<meta name="viewport">` makes mobile browsers render at device width.
- CSS is loaded in the `<head>` to avoid a flash of unstyled content (FOUC).
- The `#root` div is the single mount point where React attaches and manages the UI.

## Script order (CDN + local)

1. `react.development.js` defines the global `React`.
2. `react-dom.development.js` defines `ReactDOM` and depends on `React`.
3. `index.js` uses `React`/`ReactDOM` and needs `#root` to exist.

Reasoning: scripts in the head block HTML parsing unless you use `defer`. Placing them at the end ensures the DOM is ready and avoids blocking first paint.

## React.createElement basics (index.js)

- `React.createElement(type, props, children)` returns a React element (plain object).
- React elements describe UI; they are not real DOM nodes.
- `className` is used instead of `class` because JSX is JavaScript.
- When children are an array, keys help React match siblings across renders.

## Interview-style Q&A with reasoning

Q: Why put the React scripts before `index.js`?
A: `index.js` uses `React` and `ReactDOM`.
Reasoning: the UMD builds attach globals in load order; using them before they exist throws errors.

Q: Why is `createRoot` used in React 18?
A: It is the modern root API and supports concurrent features.
Reasoning: the old `ReactDOM.render` API is deprecated and lacks new scheduling behavior.

Q: Why not put the scripts in the head without `defer`?
A: Scripts in the head block parsing and can delay first paint.
Reasoning: the browser must download and execute blocking scripts before continuing.

Q: Why use a single `#root`?
A: A single root keeps the React tree cohesive.
Reasoning: state, context, and updates are easier to manage in one tree.

Q: What does `crossorigin` do here?
A: It enables CORS so errors show full stack traces and SRI can work.
Reasoning: without CORS, browsers hide script error details for security.

Q: Why are keys required only for lists?
A: React needs a stable identity for siblings to update efficiently.
Reasoning: without keys, React can re-create nodes and lose state.

Q: Is JSX required to use React?
A: No, JSX compiles to `React.createElement`.
Reasoning: JSX is syntax sugar that improves readability.

Q: Why use the development build here?
A: It shows helpful warnings and error messages.
Reasoning: you are learning; the dev build is more descriptive.

## Common mistakes to watch

- Loading `index.js` before the CDN scripts (React not defined).
- Forgetting the `#root` div or giving it the wrong id.
- Reusing the same key value for siblings in the same array.
- Putting CSS at the end and seeing a flash of unstyled content.

## Small exercises

1. Change the `h1` text and verify the DOM updates.
2. Add a third child div and give it unique keys.
3. Move scripts into the head with `defer` and confirm it still works.


## Parcel
- Dev Build
- Local Server
- HMR = Hot Module Replacement( Detecting a change and updating the page because  of FILE WATCHING ALGORITHM written in C++ )
- Caching ( File Hashing ) so faster builds
- Images and Video Optimization
- Minification of files 
- Bundling and Compression 
- Consistent Hashing - ( big topic )
- Code Splitting 
- Diffrenetial Bundling - support for old browsers 
- Tree Shaking - remove unused code