// Build the whole app in small steps:
// 1) Counter state + render + button events
// 2) Todo state (array of {id, text, done}) + render
// 3) Add / toggle / delete
// 4) Filter
// 5) Persist to localStorage

const decBtn = document.querySelector("#decBtn");
const incBtn = document.querySelector("#incBtn");
const resetBtn = document.querySelector("#resetBtn");
const countEl = document.querySelector("#count");

let count = 0;

function renderCount() {
  countEl.textContent = String(count);
}

decBtn.addEventListener("click", () => {
  count -= 1;
  renderCount();
});

incBtn.addEventListener("click", () => {
  count += 1;
  renderCount();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  renderCount();
});

renderCount();

// Todos (starter structure)
const todoInput = document.querySelector("#todoInput");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");

let filter = "all"; // "all" | "active" | "done"
let todos = [];

function renderTodos() {
  todoList.innerHTML = "";
  const visible = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  for (const t of visible) {
    const li = document.createElement("li");

    const label = document.createElement("button");
    label.type = "button";
    label.className = "secondary";
    label.style.textAlign = "left";
    label.style.flex = "1";
    label.textContent = t.done ? `✅ ${t.text}` : t.text;
    label.addEventListener("click", () => {
      todos = todos.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x));
      renderTodos();
    });

    const del = document.createElement("button");
    del.type = "button";
    del.className = "secondary";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      todos = todos.filter((x) => x.id !== t.id);
      renderTodos();
    });

    li.append(label, del);
    todoList.append(li);
  }
}

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) return;

  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  todos = [{ id, text, done: false }, ...todos];
  todoInput.value = "";
  renderTodos();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  filter = btn.getAttribute("data-filter");
  renderTodos();
});

renderTodos();
