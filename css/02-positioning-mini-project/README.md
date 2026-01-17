# CSS 02 - Positioning Mini Project (Skeleton)

Goal: `absolute` + `fixed` + `z-index` practice with a small UI.

## Run

Open `index.html` in your browser.

## What to build (TODO)

1) Tooltip (absolute):
- Hover on info icon → tooltip show
- Tooltip should be positioned relative to the icon wrapper (parent should be `position: relative`)

2) Dropdown menu (absolute):
- Click “Menu” → dropdown open below the button
- Click outside → close (event bubbling/delegation practice)

3) Modal (fixed):
- Click “Open modal” → modal overlay open
- Center the modal using `position: fixed` + `inset` OR `top/left + translate`

No JS implemented here—only UI skeleton + CSS placeholders.

## Positioning cheatsheet (Hinglish)

### Tooltip

- Parent (`.infoWrap`) pe `position: relative` do.
- Tooltip pe `position: absolute`.
- Common placement:
  - `left: 0; top: calc(100% + 8px);` (icon ke neeche)
  - ya `right: 0` (right align)

### Dropdown

- Parent (`.menuWrap`) pe `position: relative`.
- Dropdown pe `position: absolute`.
- Typical:
  - `top: calc(100% + 8px); left: 0;`

### Modal

- Overlay pe `position: fixed; inset: 0;` (full screen cover)
- Modal center karne ke common ways:
  1) `display: grid; place-items: center;` on overlay (easy)
  2) `top: 50%; left: 50%; transform: translate(-50%, -50%);` on modal

## z-index tip

- Overlay ko high z-index do (ex 1000) so it stays above page.
- Remember: z-index works reliably when element is positioned.
