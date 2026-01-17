# CSS 01 - Positioning Playground

Goal: `position` samajhna without confusion.

## Run

Open `index.html` in your browser.

## What to observe (Hinglish)

- `static` (default) = normal document flow (top/left ka effect nahi)
- `relative` = flow me rehta hai, but visually shift hota hai (space reserve hota hai)
- `absolute` = flow se bahar; nearest positioned parent ke relative (space reserve nahi)
- `fixed` = viewport (screen) ke relative; scroll pe bhi chipka rehta hai
- `sticky` = threshold tak normal, phir stick (scroll container ke andar)

Tip: Page scroll karke differences feel karo.

## Detailed explanation (short but clear)

### 1) `position: static`

- Default state.
- `top/right/bottom/left` ignore hote hain.
- Use-case: mostly you don’t set it explicitly.

### 2) `position: relative`

- Element **flow me** rehta hai (iska space layout me reserved rehta hai).
- `top/left` se element visually move hota hai, but **original gap remains**.
- Use-case:
  - Small nudges
  - Most important: parent ko `position: relative` karke child absolute ko anchor karna.

### 3) `position: absolute`

- Element flow se bahar nikal jata hai (space reserve nahi hota).
- It positions relative to:
  - nearest ancestor with `position != static`
  - warna initial containing block (page/document)
- Use-case:
  - Tooltip, badge, dropdown, close button, overlay items within a card.

### 4) `position: fixed`

- Viewport ke relative position.
- Scroll karne pe element same spot pe rahega.
- Use-case:
  - Floating “Help” button, chat widget, sticky bottom bar, modal overlay.

### 5) `position: sticky`

- Mix of relative + fixed.
- Start me normal flow (relative jaisa).
- Jese hi scroll threshold hit hota hai (ex `top: 0`), element stick ho jata hai.
- Needs:
  - `top` (or `left/right/bottom`)
  - a scroll container (window or an element with overflow)
- Common pitfall:
  - Parent/ancestor pe `overflow: hidden` / `overflow: auto` etc. sticky behavior affect kar sakta hai.

## Common confusion points (quick)

- **Why absolute not working?** → parent pe `position: relative` missing.
- **Why z-index not working?** → element positioned nahi hai, ya stacking context issue.
- **Why fixed covers everything?** → fixed is outside normal flow; use z-index carefully.
