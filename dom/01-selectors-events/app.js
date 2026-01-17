// DOM 01: selectors + events + Math.random() demo (Hinglish).
//
// Aapne notice kiya tha: random elements banate hi scrollbars aa rahe the.
//
// Scrollbar kyu aata hai?
// - Jab element viewport/page ke bahar chala jaata hai (overflow), browser document ka size bada kar deta hai.
// - Document size bada => right/left (ya bottom) scrollbar.
//
// `position: absolute` vs `position: fixed` (short):
// - absolute: nearest "positioned" parent ke relative hota hai (jiska position relative/absolute/fixed/sticky ho).
//            Agar aisa parent nahi mila, to document/page ke relative ho jaata hai.
//            Page scroll karoge to element scroll ke saath move karega.
// - fixed: viewport (screen) ke relative hota hai. Scroll pe bhi same jagah fixed rahta hai.
//
// Is file me dono ka demo hai:
// - "ABS dot (box)" => dot demo box ke andar absolute positioned (parent = relative)
// - "FIXED dot (screen)" => dot viewport ke andar fixed positioned (screen pe chipka hua)

// TODO 1: select elements (#helloBtn, #toggleBtn, #msg)
const helloBtn = document.getElementById("helloBtn"); // "Say hello" button (DOM se element uthaya)
const toggleBtn = document.getElementById("toggleBtn"); // highlight toggle button
const absBtn = document.getElementById("absBtn"); // ABS dot create button (box ke andar)
const fixedBtn = document.getElementById("fixedBtn"); // FIXED dot create button (screen pe)
const clearBtn = document.getElementById("clearBtn"); // saare dots clear karne wala button
const msg = document.getElementById("msg"); // message paragraph jisme hum text + highlight show karte hain
const demoBox = document.getElementById("demoBox"); // ABS demo box (CSS me position: relative)

function randomInt(min, max) {
  // Integer in [min, max] (both included)
  // Math.random() -> [0, 1)
  // (max - min + 1) se range size milta hai (inclusive banane ke liye +1)
  // Math.floor() decimals hata ke integer bana deta hai
  // + min se range shift ho jaati hai
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeDot() {
  const dot = document.createElement("div"); // ek naya div banaya (dot)
  dot.className = "dot"; // CSS class attach ki (size + circle shape CSS me hai)

  // Random background color: rgb(0..255, 0..255, 0..255)
  const r = randomInt(0, 255); // red channel 0-255
  const g = randomInt(0, 255); // green channel 0-255
  const b = randomInt(0, 255); // blue channel 0-255
  dot.style.backgroundColor = `rgb(${r}, ${g}, ${b})`; // final random color set

  return dot; // caller ko ready dot return
}

function createFixedDotOnScreen() {
  // FIXED dot viewport ke relative hota hai (scroll pe bhi same place).
  // Also, clamp kar rahe hain so dot screen ke bahar na jaye => scrollbars avoid.
  const dot = makeDot(); // random colored dot banaya
  dot.style.position = "fixed"; // viewport (screen) ke relative positioning

  const size = dot.getBoundingClientRect().width || 12; // actual dot width (fallback 12px)
  const maxLeft = Math.max(0, window.innerWidth - size); // last safe left so dot fully visible rahe
  const maxTop = Math.max(0, window.innerHeight - size); // last safe top so dot fully visible rahe

  dot.style.left = `${randomInt(0, Math.floor(maxLeft))}px`; // clamp karke random left
  dot.style.top = `${randomInt(0, Math.floor(maxTop))}px`; // clamp karke random top

  dot.dataset.kind = "fixed"; // data attribute (debug / samajhne ke liye)
  document.body.appendChild(dot); // body me add kiya (screen pe show hoga)
}

function createAbsoluteDotInBox() {
  // ABSOLUTE dot nearest positioned parent ke relative hota hai.
  // Yaha demoBox ka `position: relative` hai, so dot box ke andar random place hoga.
  const dot = makeDot(); // random colored dot
  dot.style.position = "absolute"; // parent (demoBox) ke relative, kyunki parent positioned hai

  const size = dot.getBoundingClientRect().width || 12; // dot size (px)
  const maxLeft = Math.max(0, demoBox.clientWidth - size); // box ke andar last safe left
  const maxTop = Math.max(0, demoBox.clientHeight - size); // box ke andar last safe top

  dot.style.left = `${randomInt(0, Math.floor(maxLeft))}px`; // box ke andar random left
  dot.style.top = `${randomInt(0, Math.floor(maxTop))}px`; // box ke andar random top

  dot.dataset.kind = "abs"; // data attribute (debug / learning)
  demoBox.appendChild(dot); // dot ko box ke andar add kiya
}

// TODO 2: on hello button click -> set msg text to "Hello DOM!"
helloBtn.addEventListener("click", () => {
  msg.textContent = "Hello DOM!"; // paragraph ka text update
  createFixedDotOnScreen(); // ek fixed dot bana do (screen pe)
});

// TODO 3: on toggle click -> toggle the "highlight" class on #msg
toggleBtn.addEventListener("click", () => {
  msg.classList.toggle("highlight"); // class add/remove toggle (CSS highlight)
});

absBtn.addEventListener("click", () => {
  msg.textContent = "ABS dot: parent (box) ke relative place hota hai."; // explain in msg
  createAbsoluteDotInBox(); // box ke andar ABS dot create
});

fixedBtn.addEventListener("click", () => {
  msg.textContent = "FIXED dot: viewport (screen) ke relative place hota hai."; // explain in msg
  createFixedDotOnScreen(); // screen pe FIXED dot create
});

clearBtn.addEventListener("click", () => {
  // Dono types ke dots remove karo.
  document.querySelectorAll(".dot").forEach((el) => el.remove()); // saare dots remove (both box + screen)
});
