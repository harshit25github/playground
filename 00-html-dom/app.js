// TODO 1: load saved name from localStorage on page load.
// - key suggestion: "playground.name"
// - if present, update #nameOutput and show #savedBadge for 1 second

const nameInput = document.querySelector("#nameInput");
const saveNameBtn = document.querySelector("#saveNameBtn");
const nameOutput = document.querySelector("#nameOutput");
const savedBadge = document.querySelector("#savedBadge");

function showSavedBadge() {
  savedBadge.classList.remove("hidden");
  window.setTimeout(() => savedBadge.classList.add("hidden"), 1000);
}

saveNameBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();
  if (!value) return;

  // TODO 2: save name to localStorage, update UI, show badge
  nameOutput.textContent = value;
  showSavedBadge();
});

// List demo
const itemInput = document.querySelector("#itemInput");
const addItemBtn = document.querySelector("#addItemBtn");
const clearBtn = document.querySelector("#clearBtn");
const listEl = document.querySelector("#list");

// TODO 3: persist this array to localStorage whenever it changes.
let items = ["Learn querySelector", "Handle click events", "Render a list"];

function render() {
  listEl.innerHTML = "";

  for (const text of items) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "secondary";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      // TODO 4: remove this item and re-render + persist
      items = items.filter((x) => x !== text);
      render();
    });

    li.append(span, removeBtn);
    listEl.append(li);
  }
}

addItemBtn.addEventListener("click", () => {
  const value = itemInput.value.trim();
  if (!value) return;

  // TODO 5: add item to array, clear input, re-render + persist
  items = [value, ...items];
  itemInput.value = "";
  render();
});

clearBtn.addEventListener("click", () => {
  // TODO 6: clear array, re-render + persist
  items = [];
  render();
});

render();

