// DOM 13 - Reels Bubbling/Delegation Skeleton (Hinglish)
//
// IMPORTANT: As requested, yaha koi JS implementation nahi hai.
// Aap khud event bubbling/delegation implement karoge.
//
// ---------------- Concept: Event Bubbling ----------------
// Most events (like `click`) bubble karte hain:
// - Child pe click -> event target child hota hai
// - Event parent containers tak bubble hota hai
//
// Example:
// - Agar aap `#feed` pe click listener lagate ho
// - aur click `.iconBtn` pe hota hai
// - to listener fire hoga, and:
//   - e.target => actual clicked inner element (like <span class="icon">)
//   - e.currentTarget => #feed (jahan listener laga hai)
//
// ---------------- Concept: Event Delegation ----------------
// Delegation ka matlab:
// - Har button pe alag listener mat lagao
// - Parent (`#feed`) pe 1 listener lagao
// - `e.target.closest("[data-action]")` se button nikalo
// - `btn.dataset.action` se action pata chalega (like/comment/share/save/mute)
//
// Reel identify:
// - `const reel = btn.closest("[data-reel-id]")`
// - `reel.dataset.reelId` se id
//
// ---------------- stopPropagation vs preventDefault ----------------
// - `e.stopPropagation()` => event aage parents tak nahi jayega (bubbling stop)
// - `e.preventDefault()` => default browser action stop (like <a href> navigation)
//   (bubbling still continues unless you stopPropagation)
//
// ---------------- Suggested TODO steps (aap implement karo) ----------------
// 1) Select #feed and add ONE `click` listener.
// 2) Inside handler:
//    - Find action button using `e.target.closest("[data-action]")`
//    - If null, return.
// 3) Get reel using `closest("[data-reel-id]")`
// 4) Switch on action:
//    - like: toggle UI + update count
//    - comment: open/close drawer
//    - closeComments: close drawer (try stopPropagation here)
//    - openProfile: preventDefault() + open modal/alert
// 5) Make a "bubbling order" demo:
//    - Add a listener on document/body as well
//    - Observe log order: button -> reel -> feed -> body -> document

