const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

let todos = [
  { id: 1, text: "Use one click handler", done: false },
  { id: 2, text: "Toggle and delete", done: false },
];
let nextId = 3;

function render() {
  list.innerHTML = "";
  for (const t of todos) {
    const li = document.createElement("li");
    li.dataset.id = String(t.id);

    const text = document.createElement("span");
    text.textContent = t.done ? `✅ ${t.text}` : t.text;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "secondary";
    toggleBtn.dataset.action = "toggle";
    toggleBtn.textContent = "Toggle";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "secondary";
    delBtn.dataset.action = "delete";
    delBtn.textContent = "Delete";

    li.append(text, toggleBtn, delBtn);
    list.append(li);
  }
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  todos = [{ id: nextId++, text, done: false }, ...todos];
  input.value = "";
  render();
});

list.addEventListener("click", (e) => {
  // TODO: use event delegation:
  // - find closest <li> to get id
  // - read button data-action ("toggle"|"delete")
  // - update state then render()
});

render();

