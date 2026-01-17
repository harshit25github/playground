function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// TODO 1: pluck(items, key) -> array of values
function pluck(items, key) {
  return [];
}

// TODO 2: groupBy(items, keyFn) -> object { [key]: items[] }
function groupBy(items, keyFn) {
  return {};
}

// TODO 3: toggleTodoDone(todos, id) -> new array (don’t mutate input)
function toggleTodoDone(todos, id) {
  return todos;
}

// Tests (don’t change)
const people = [
  { id: 1, name: "A", team: "red" },
  { id: 2, name: "B", team: "blue" },
  { id: 3, name: "C", team: "red" },
];
assert(JSON.stringify(pluck(people, "name")) === JSON.stringify(["A", "B", "C"]), "pluck");

const grouped = groupBy(people, (p) => p.team);
assert(grouped.red.length === 2, "group red");
assert(grouped.blue.length === 1, "group blue");

const todos = [
  { id: 1, text: "x", done: false },
  { id: 2, text: "y", done: true },
];
const next = toggleTodoDone(todos, 1);
assert(todos[0].done === false, "no mutation");
assert(next[0].done === true, "toggled");

console.log("✅ All tests passed");

