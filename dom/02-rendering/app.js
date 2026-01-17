const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

let items = ["render", "update state", "re-render"];

function render() {
  // TODO 1: clear list and render all items into <li>
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  // TODO 2: update items immutably and call render()
});

render();

