// DOM 10 - Virtual Keyboard (Skeleton) (Hinglish)
//
// IMPORTANT: as requested, yaha par actual event wiring nahi kiya.
// Aap khud implement karoge.
//
// Suggested TODO plan:
//
// 1) DOM select:
//    - #output textarea
//    - #keyboard container
//    - all keys: `.key`
//
// 2) Highlight logic:
//    - function getKeyElByEvent(e):
//        - use e.key (like "a", "A", "Enter", "Backspace", " ")
//        - map " " (space) => data-key="Space"
//        - map Shift left/right => data-key="Shift" or "ShiftRight"
//    - keydown => add class `pressed`
//    - keyup => remove class `pressed`
//
// 3) Typing logic:
//    - On keydown: update textarea value
//    - Special cases: Backspace, Enter, Tab, Space
//    - Prevent default where needed (Tab / Space scroll etc.)
//
// 4) CapsLock + Shift:
//    - Maintain state variables: isCaps, isShiftPressed
//    - Decide final letter case
//
// 5) Clicking on on-screen keys (optional):
//    - Click event on #keyboard using delegation
//    - Determine key via dataset.key and update output

