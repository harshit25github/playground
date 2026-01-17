// DOM 07 - Async in DOM (Hinglish)
//
// Is file ka goal:
// - browser me async ko samajhna (timers, promises, async/await)
// - "sequential vs parallel" ka difference feel karna
// - debounce, timeout, abort jaise real-world patterns practice karna

// ---------- DOM refs ----------
const logEl = document.querySelector("#log");
const clearBtn = document.querySelector("#clearBtn");
const timerBtn = document.querySelector("#timerBtn");
const microBtn = document.querySelector("#microBtn");
const seqParBtn = document.querySelector("#seqParBtn");
const abortDemoBtn = document.querySelector("#abortDemoBtn");

const searchInput = document.querySelector("#searchInput");
const searchStatus = document.querySelector("#searchStatus");
const downloadButton = document.querySelector("#download");
const BASE_URL = "http://localhost:3000"; // optional backend
const baseUrlLabel = document.querySelector("#baseUrlLabel");
const todoInput = document.querySelector("#todoInput");
const createTodoBtn = document.querySelector("#createTodoBtn");
const loadTodosBtn = document.querySelector("#loadTodosBtn");
const todoList = document.querySelector("#todoList");

baseUrlLabel.textContent = BASE_URL;

// ---------- small utils ----------
function nowTime() {
  // simple timestamp for logs (HH:MM:SS)
  return new Date().toLocaleTimeString();
}

function log(message) {
  // UI log panel me line add karna
  const line = document.createElement("div");
  line.className = "logLine";
  line.textContent = `[${nowTime()}] ${message}`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight; // latest line visible
  console.log(message); // console me bhi
}

function clearLog() {
  logEl.innerHTML = "";
}

function wait(ms) {
  // "sleep" style promise (setTimeout wrap)
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function debounce(fn, delayMs) {
  // Debounce ka matlab:
  // - user fast-fast trigger kare (typing/click) to hum fn ko har time na chalaye
  // - last event ke delayMs baad sirf ek call chalti hai
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
}

function abortableWait(ms, signal) {
  // AbortController signal se "wait" ko cancel karna (browser-friendly demo)
  // - signal.abort() hote hi promise reject kar denge
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException("Aborted", "AbortError"));

    const id = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };

    const cleanup = () => {
      clearTimeout(id);
      signal?.removeEventListener("abort", onAbort);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function withTimeout(promise, ms) {
  // Pattern: kisi promise ko max time do; warna reject.
  // - real life: slow network, stuck request, etc.
  const controller = new AbortController();

  const timeoutPromise = abortableWait(ms, controller.signal).then(() => {
    throw new Error("Timed out");
  });

  // Race: jo pehle finish hoga wahi final.
  // - Agar original promise pehle resolved -> ok
  // - Agar timeout pehle -> "Timed out"
  return Promise.race([promise, timeoutPromise]).finally(() => controller.abort());
}

async function retry(fn, { times, delayMs }) {
  // Retry pattern:
  // - fn fail ho jaye to dubara try karo (times times)
  // - delayMs wait between retries
  let lastError = null;
  for (let attempt = 1; attempt <= times; attempt += 1) {
    try {
      return await fn(attempt);
    } catch (e) {
      lastError = e;
      log(`Retry attempt ${attempt} failed: ${e.message}`);
      if (attempt < times) await wait(delayMs);
    }
  }
  throw lastError;
}

// ---------- demos ----------
async function timerDemo() {
  clearLog();
  log("Timer demo start");

  // setTimeout => macrotask (later)
  setTimeout(() => log("setTimeout( 5sec ) fired"), 5000);

  // setInterval => repeatedly fires (stop after some ticks)
  let ticks = 0;
  const id = setInterval(() => {
    ticks += 1;
    log(`setInterval tick ${ticks}`);
    if (ticks === 3) {
      clearInterval(id);
      log("interval cleared");
    }
  }, 200);

  log("Sync part finished (ab event loop callbacks aayenge)");
}

async function microVsMacroDemo() {
  clearLog();
  log("Micro vs Macro demo start");

  // Macrotask
  setTimeout(() => log("macrotask: setTimeout"), 0);

  // Microtasks: Promise.then & queueMicrotask
  Promise.resolve()
    .then(() => log("microtask: promise.then #1"))
    .then(() => log("microtask: promise.then #2"));

  queueMicrotask(() => log("microtask: queueMicrotask"));

  log("Sync end (ab microtasks run honge, fir macrotask)");
}

async function sequentialVsParallelDemo() {
  clearLog();
  log("Sequential vs Parallel demo start");

  // Fake async jobs (sirf wait)
  const job = async (name, ms) => {
    log(`${name} started`);
    await wait(ms);
    log(`${name} finished`);
    return name;
  };

  // Sequential
  const sStart = performance.now();
  const a = await job("A", 300);
  const b = await job("B", 400);
  const c = await job("C", 200);
  const sTook = Math.round(performance.now() - sStart);
  log(`Sequential done: ${[a, b, c].join(", ")} (took ~${sTook}ms)`);

  log("-----");

  // Parallel (Promise.all)
  const pStart = performance.now();
  const results = await Promise.all([job("A", 300), job("B", 400), job("C", 200)]);
  const pTook = Math.round(performance.now() - pStart);
  log(`Parallel done: ${results.join(", ")} (took ~${pTook}ms)`);
}

async function abortTimeoutDemo() {
  clearLog();
  log("Abort/Timeout demo start");

  // 1) Abort demo (cancel a pending task)
  const controller = new AbortController();
  const { signal } = controller;

  const work = (async () => {
    log("Work: started (will take 3s unless aborted)");
    await abortableWait(3000, signal);
    log("Work: finished (not aborted)");
  })();

  // 500ms ke baad abort
  setTimeout(() => {
    log("Calling abort() after 500ms");
    controller.abort();
  }, 500);

  try {
    await work;
  } catch (e) {
    // AbortError browser ka standard error hota hai
    log(`Work failed: ${e.name} (${e.message})`);
  }

  log("-----");

  // 2) Timeout demo (race)
  try {
    log("withTimeout: starting 2s task with 600ms timeout");
    await withTimeout(wait(2000), 600);
    log("withTimeout: finished");
  } catch (e) {
    log(`withTimeout failed: ${e.message}`);
  }
}

// ---------- debounce demo ----------
const debouncedFakeSearch = debounce(async (text) => {
  // Real-world me yahi jagah pe fetch call hota (search API)
  // Debounce se unnecessary calls kam ho jaate hain.
  searchStatus.textContent = "Searching...";
  log(`Search request started for: "${text}"`);
  await wait(400);
  searchStatus.textContent = `Done: "${text}"`;
  log(`Search request finished for: "${text}"`);
}, 350);

searchInput.addEventListener("input", () => {
  const text = searchInput.value.trim();
  searchStatus.textContent = text ? "Typing..." : "";
  debouncedFakeSearch(text);
});

// ---------- fetch demo (optional backend) ----------
function renderTodos(items) {
  todoList.innerHTML = "";
  for (const t of items) {
    const li = document.createElement("li");
    li.textContent = t.done ? `✅ ${t.text}` : t.text;
    todoList.appendChild(li);
  }
}

async function loadTodos() {
  clearLog();
  log("Loading todos...");
  try {
    const res = await fetch(`${BASE_URL}/api/todos`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderTodos(data.items || []);
    log(`Loaded ${data.items?.length ?? 0} todos`);
  } catch (e) {
    log(`Fetch failed: ${e.message}`);
    log("Tip: start backend at playground/10-node-http-api (node server.js)");
  }
}

async function createTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  log(`Creating todo: "${text}"`);
  try {
    // Retry example: if backend temporarily down, you can retry few times.
    await retry(
      async () => {
        const res = await fetch(`${BASE_URL}/api/todos`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      },
      { times: 2, delayMs: 300 },
    );

    todoInput.value = "";
    await loadTodos();
  } catch (e) {
    log(`Create failed: ${e.message}`);
  }
}
async function downLoad() {
  
  let innerElmentWidth =  0
  let innerElement = document.querySelector('.inner')
  let percentageElment = document.querySelector('.bottom>h2')
  const speed = Math.floor(Math.random() * 101) 
  const btn = document.getElementById('download')
  btn.textContent = 'Downloading...'
  btn.style.pointerEvents = 'none'
  btn.style.opacity = '0.6'
  const id = setInterval(() => { 
    
    innerElmentWidth += 1
    percentageElment.textContent = `${innerElmentWidth}%`
    innerElement.style = `width: ${innerElmentWidth}%`
    if(innerElmentWidth === 100){
      clearInterval(id)
      btn.textContent = 'Downloaded'
     
    }

    
},speed)

}
// ---------- wire up buttons ----------
clearBtn.addEventListener("click", clearLog);
timerBtn.addEventListener("click", timerDemo);
microBtn.addEventListener("click", microVsMacroDemo);
seqParBtn.addEventListener("click", sequentialVsParallelDemo);
abortDemoBtn.addEventListener("click", abortTimeoutDemo);

loadTodosBtn.addEventListener("click", loadTodos);
createTodoBtn.addEventListener("click", createTodo);
downloadButton.addEventListener("click", downLoad);


log("Ready. Buttons use karke demos run karo.");

