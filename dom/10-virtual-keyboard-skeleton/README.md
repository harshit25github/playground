# DOM 10 - Virtual Keyboard (Skeleton)

Goal: on-screen virtual keyboard banana + real keyboard events se sync karna.

## Run

Open `index.html` in your browser.

## Features (aap implement karo)

- `keydown` / `keyup` events listen
- Pressed key highlight (on-screen keys)
- Text output in `#output` (type karte jao)
- `Backspace`, `Enter`, `Space`, `Tab` handling
- `Shift` / `CapsLock` state + letter casing
- Optional: sound on key press

## Hints

- Har key element pe `data-key="a"` jaisa attribute diya hai.
- Special keys: `data-key="Backspace"`, `Enter`, `Space`, `Tab`, `Shift`, `CapsLock`.
- Mapping: `KeyboardEvent.key` ko match karo (mostly same strings).

