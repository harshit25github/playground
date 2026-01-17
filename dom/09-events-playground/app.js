// DOM 09 - Events Playground (Hinglish)
//
// Idea: "most used events" ko ek hi jagah pe dekhna + samajhna.
// Aap is file ko revise karte time topics ko identify kar sakte ho:
// - Mouse events: click, dblclick, contextmenu, mousemove, mousedown/up, enter/leave
// - Keyboard events: keydown/keyup
// - Focus events: focus/blur
// - Form events: submit, change, input
// - Scroll/resize events
// - Event delegation + bubbling + stopPropagation
// - Drag & drop
// - Clipboard: copy/paste
//
// Note: scroll/mousemove events bahut frequently fire hote hain,
// isliye hum kuch places pe throttle-like behavior use karenge (simple).

// ---------- Helpers ----------
const logEl = document.querySelector("#log");
const clearLogBtn = document.querySelector("#clearLogBtn");
const pauseLog = document.querySelector("#pauseLog");

function time() {
  return new Date().toLocaleTimeString();
}

function log(message) {
  // Agar pause enabled hai to log spam avoid
  if (pauseLog.checked) return;

  const line = document.createElement("div");
  line.className = "logLine";
  line.textContent = `[${time()}] ${message}`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
  console.log(message);
}

function clearLog() {
  logEl.innerHTML = "";
}

function debounce(fn, delayMs) {
  // Debounce: last call ke delayMs baad hi run.
  let id = null;
  return (...args) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => fn(...args), delayMs);
  };
}

function throttle(fn, intervalMs) {
  // Throttle: intervalMs me max 1 run.
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last < intervalMs) return;
    last = now;
    fn(...args);
  };
}

clearLogBtn.addEventListener("click", clearLog);

// ---------- Mouse events ----------
const clickBtn = document.querySelector("#clickBtn");
const dblBtn = document.querySelector("#dblBtn");
const mouseBox = document.querySelector("#mouseBox");
const coords = document.querySelector("#coords");

clickBtn.addEventListener("click", (e) => {
  // click event: most common (mouse + keyboard accessible via Enter/Space on buttons)
  log(`clickBtn: click (type=${e.type})`);
});

dblBtn.addEventListener("dblclick", () => {
  // dblclick: double click
  log("dblBtn: dblclick");
});

mouseBox.addEventListener("contextmenu", (e) => {
  // contextmenu: right-click pe fire hota hai
  // preventDefault() => browser ka right-click menu nahi khulega
  e.preventDefault();
  log("mouseBox: contextmenu (right-click) [preventDefault called]");
});

mouseBox.addEventListener("mouseenter", () => {
  // mouseenter: cursor element me enter kare (bubbling nahi hota)
  log("mouseBox: mouseenter");
});

mouseBox.addEventListener("mouseleave", () => {
  // mouseleave: cursor element se bahar nikle (bubbling nahi hota)
  log("mouseBox: mouseleave");
});

mouseBox.addEventListener("mousedown", (e) => {
  // mousedown: mouse button press
  log(`mouseBox: mousedown (button=${e.button})`);
});

mouseBox.addEventListener("mouseup", (e) => {
  // mouseup: mouse button release
  log(`mouseBox: mouseup (button=${e.button})`);
});

mouseBox.addEventListener(
  "mousemove",
  throttle((e) => {
    // mousemove: cursor move; very frequent
    // clientX/clientY => viewport coordinates
    coords.textContent = `x: ${e.clientX}, y: ${e.clientY}`;
    log(`mouseBox: mousemove (x=${e.clientX}, y=${e.clientY})`);
  }, 200),
);

// ---------- Keyboard + focus ----------
const keyInput = document.querySelector("#keyInput");
const focusBtn = document.querySelector("#focusBtn");
const keyStatus = document.querySelector("#keyStatus");

focusBtn.addEventListener("click", () => {
  // focus(): programmatically input focus
  keyInput.focus();
});

keyInput.addEventListener("focus", () => {
  // focus: input me cursor aaya
  log("keyInput: focus");
});

keyInput.addEventListener("blur", () => {
  // blur: input se focus gaya
  log("keyInput: blur");
});

keyInput.addEventListener("keydown", (e) => {
  // keydown: key press (repeat ho sakta hai agar hold karo)
  keyStatus.textContent = `keydown: key="${e.key}" code="${e.code}" repeat=${e.repeat}`;
  log(`keyInput: keydown (key=${e.key}, code=${e.code}, repeat=${e.repeat})`);

  // Example: Enter press pe default behavior stop
  if (e.key === "Enter") {
    // preventDefault: default action stop (yaha form submit etc. avoid)
    e.preventDefault();
    log("keyInput: Enter pressed -> preventDefault()");
  }
});

keyInput.addEventListener("keyup", (e) => {
  // keyup: key release
  keyStatus.textContent = `keyup: key="${e.key}"`;
  log(`keyInput: keyup (key=${e.key})`);
});

// Global keydown (whole document)
document.addEventListener("keydown", (e) => {
  // Note: ye everywhere fire hoga; isliye yaha log spam ho sakta hai.
  // Sirf Escape pe log karte hain.
  if (e.key === "Escape") log("document: Escape pressed");
});

// ---------- Form submit ----------
const demoForm = document.querySelector("#demoForm");

demoForm.addEventListener("submit", (e) => {
  // submit: by default page reload hota (form action)
  // preventDefault() => SPA style handling
  e.preventDefault();

  // FormData se values nikalna easy hota hai
  const data = new FormData(demoForm);
  const name = String(data.get("name") || "");
  const role = String(data.get("role") || "");
  log(`form: submit (name="${name}", role="${role}") [preventDefault]`);
});

// ---------- Input vs change ----------
const liveInput = document.querySelector("#liveInput");
const selectInput = document.querySelector("#selectInput");
const inputStatus = document.querySelector("#inputStatus");

liveInput.addEventListener("input", () => {
  // input event: har keystroke pe
  inputStatus.textContent = `input: "${liveInput.value}"`;
  log(`liveInput: input value="${liveInput.value}"`);
});

liveInput.addEventListener("change", () => {
  // change event: usually tab fire hota hai jab input "commit" ho (often blur pe)
  log(`liveInput: change value="${liveInput.value}"`);
});

selectInput.addEventListener("change", () => {
  // select ke case me change instantly selection change pe
  log(`selectInput: change value="${selectInput.value}"`);
});

// ---------- Scroll + resize ----------
const scrollPanel = document.querySelector("#scrollPanel");
const resizeStatus = document.querySelector("#resizeStatus");

scrollPanel.addEventListener(
  "scroll",
  throttle(() => {
    // scroll event: very frequent; throttle to reduce logs
    log(`scrollPanel: scrollTop=${scrollPanel.scrollTop}`);
  }, 250),
);

window.addEventListener(
  "resize",
  debounce(() => {
    // resize: window size change
    // debounce: resizing ke time spam kam
    const text = `window resized: ${window.innerWidth}x${window.innerHeight}`;
    resizeStatus.textContent = text;
    log(text);
  }, 200),
);

// ---------- Event delegation + bubbling ----------
const list = document.querySelector("#list");

list.addEventListener("click", (e) => {
  // Event delegation:
  // - parent pe ek listener
  // - actual clicked button ko find karo via closest()
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  log(`delegation: clicked action="${action}" (event bubbles to parent)`);

  // stopPropagation demo:
  // - is button pe click -> event parent tak aaya, yaha hum stopPropagation call karenge
  // - but note: yaha already parent handler me hain; stopPropagation would matter
  //   for ancestors above `list`.
  if (action === "danger") {
    e.stopPropagation();
    log("delegation: stopPropagation() called (ancestors won't receive this click)");
  }
});

// Ancestor listener to show bubbling (will not run if stopPropagation happened above)
document.body.addEventListener("click", (e) => {
  const label = e.target.closest("button") ? "button click bubbled" : "body click bubbled";
  // Avoid too much noise; only log when click happens inside the delegation card.
  if (e.target.closest("#list")) log(`body: ${label}`);
});

// ---------- Drag & Drop ----------
const dragItem = document.querySelector("#dragItem");
const dropZone = document.querySelector("#dropZone");

dragItem.addEventListener("dragstart", (e) => {
  // dragstart: drag begins
  // dataTransfer me aap data set kar sakte ho (drop pe use)
  e.dataTransfer.setData("text/plain", "DRAG ME");
  log("dragItem: dragstart (dataTransfer set)");
});

dropZone.addEventListener("dragenter", () => {
  // dragenter: draggable enters drop zone
  dropZone.classList.add("over");
  log("dropZone: dragenter");
});

dropZone.addEventListener("dragleave", () => {
  // dragleave: draggable leaves drop zone
  dropZone.classList.remove("over");
  log("dropZone: dragleave");
});

dropZone.addEventListener("dragover", (e) => {
  // dragover: IMPORTANT
  // Default behavior me drop allow nahi hota.
  // preventDefault() => browser ko batao ki yaha drop allowed hai.
  e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {
  // drop: when user drops the item
  e.preventDefault();
  dropZone.classList.remove("over");
  const text = e.dataTransfer.getData("text/plain");
  dropZone.textContent = `Dropped: ${text || "(no data)"}`;
  log(`dropZone: drop (text="${text}")`);
});

// ---------- Clipboard ----------
const clipArea = document.querySelector("#clipArea");

clipArea.addEventListener("copy", () => {
  // copy: user copies from textarea
  log("clipArea: copy");
});

clipArea.addEventListener("paste", (e) => {
  // paste: user pastes into textarea
  // e.clipboardData se pasted text access kar sakte ho
  const pasted = e.clipboardData?.getData("text") || "";
  log(`clipArea: paste (text="${pasted.slice(0, 30)}${pasted.length > 30 ? "..." : ""}")`);
});

// Initial info
log("Ready. Try different actions (mouse/keyboard/scroll/drag/copy).");

