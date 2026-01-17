const BASE_URL = "http://localhost:3000";

const baseUrlEl = document.querySelector("#baseUrl");
const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const reloadBtn = document.querySelector("#reloadBtn");
const statusEl = document.querySelector("#status");
const list = document.querySelector("#list");

baseUrlEl.textContent = BASE_URL;

function setStatus(text) {
  statusEl.textContent = text;
}

function render(items) {
  list.innerHTML = "";
  for (const t of items) {
    const li = document.createElement("li");
    li.textContent = t.done ? `✅ ${t.text}` : t.text;
    list.append(li);
  }
}

async function loadTodos() {
  // TODO 1: fetch `${BASE_URL}/api/todos` and render the list
  // response shape: { items: [...] }
}

addBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  // TODO 2: POST `${BASE_URL}/api/todos` with JSON body { text }
  // then clear input and reload list
});

reloadBtn.addEventListener("click", loadTodos);

loadTodos();

