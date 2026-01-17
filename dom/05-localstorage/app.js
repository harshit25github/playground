const themeBtn = document.querySelector("#themeBtn");
const themeLabel = document.querySelector("#themeLabel");
const notes = document.querySelector("#notes");

// TODO 1: load saved values from localStorage:
// - theme key: "dom.theme" (values: "dark" | "light")
// - notes key: "dom.notes"

function applyTheme(theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  themeLabel.textContent = `Theme: ${theme}`;
}

themeBtn.addEventListener("click", () => {
  // TODO 2: toggle theme, save to localStorage, update UI
});

notes.addEventListener("input", () => {
  // TODO 3: save notes.value to localStorage
});

