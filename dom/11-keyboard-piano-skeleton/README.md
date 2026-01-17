# DOM 11 - Piano using Keyboard Events (Skeleton)

Goal: keyboard press se notes play karna (piano).

## Run

Open `index.html` in browser.

## Sound files

This project includes local `.wav` sounds in `sounds/`.

If they are missing, generate them:

```sh
node playground/dom/11-keyboard-piano-skeleton/generate-sounds.js
```

## Plan (aap implement karo)

- `keydown`:
  - map key -> note (ex: A=S, W=black key etc.)
  - highlight pressed key
  - play sound (either Web Audio API OR these wav files)
- `keyup`:
  - un-highlight
  - stop/release sound (optional)

## Suggested mapping (simple)

- 6 keys only:
  - `a s d f g h`
  - example notes: `C D E F G A`
  - sounds (already in folder): `C4.wav D4.wav E4.wav F4.wav G4.wav A4.wav`
