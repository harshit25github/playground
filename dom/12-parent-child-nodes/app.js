// DOM 12 - Parent/ChildNodes + Event Bubbling (Hinglish notes)
//
// Aap yaha `childNodes` ko loop karke samajh rahe ho — good.
//
// Important difference:
// - `element.childNodes` => NodeList (ALL nodes): text nodes (whitespace/newline), comment nodes, element nodes.
// - `element.children`   => HTMLCollection (ONLY elements): <li>, <span>, <button> etc.
//
// Iska effect:
// - `childNodes[0]`, `childNodes[1]` indexes stable nahi hote.
//   Kyunki agar HTML me whitespace/newline change hua, text nodes insert/remove ho sakte hain.
// - Isi wajah se kabhi-kabhi aapko unexpected node milta hai (TEXT_NODE vs ELEMENT_NODE).
//
// Debug tip:
// - `node.nodeType`:
//   1 = ELEMENT_NODE
//   3 = TEXT_NODE (often whitespace)
//
// ---------------- Event Bubbling (concept) ----------------
// Jab aap click karte ho, event "propagate" hota hai:
// 1) Capturing phase (top -> down): window -> document -> ... -> target
// 2) Target phase: actual element jahan click hua
// 3) Bubbling phase (down -> up): target -> parent -> ... -> document -> window
//
// Most common events bubble karte hain (like click).
//
// `e.target` vs `e.currentTarget`:
// - e.target: jis element pe actual click hua (child)
// - e.currentTarget: jis element pe listener laga hai (parent)
//
// stopPropagation vs preventDefault:
// - `e.stopPropagation()` => bubbling/capturing ko aage nahi jaane deta
// - `e.preventDefault()` => default browser action stop (form submit, link open)
//
// Event delegation idea:
// - Parent pe listener lagao, phir `e.target.closest(...)` se child decide karo.
// - Benefit: future me new children add honge tab bhi event work karega.

const list  = document.querySelectorAll(".li");

list.forEach((item) => {
    // `item.childNodes` me text nodes (whitespace) bhi ho sakte hain.
    // Isliye console me dekhna useful hai: aapko pata chalega index 0/1 pe kya aa raha.
    console.log("Item:", item.childNodes);

    // WARNING (Hinglish):
    // `item.childNodes[1]` assume kar raha hai ki 2nd node koi element hoga (jaise <button>).
    // Agar HTML structure change hua / whitespace change hua, ye undefined ho sakta hai.
    // Practice ke liye ok, but production me `children` ya `querySelector` safer hota hai.
    item.childNodes[1].addEventListener("click", () => {
        // Yaha aap first node (childNodes[0]) ka text change kar rahe ho.
        // Again: if childNodes[0] whitespace TEXT_NODE nikla, to output unexpected ho sakta hai.
        const oldContent = item.childNodes[0].textContent;
        item.childNodes[0].textContent = "Clicked";
        setTimeout(() => {

              item.childNodes[0].textContent=  oldContent          
        }, 1000);
    })
})
