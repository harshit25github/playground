const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const error = document.querySelector("#error");
const success = document.querySelector("#success");

function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
  success.classList.add("hidden");
}

function showSuccess() {
  error.classList.add("hidden");
  success.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // TODO: validate:
  // - email should include "@"
  // - password length >= 6
  // showError(message) or showSuccess()
});

