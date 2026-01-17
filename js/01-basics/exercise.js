// Math.random() gives a decimal in [0, 1)
// 0 can happen, 1 will NEVER happen.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Random float in [min, max)
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// Random integer in [min, max] (both included)
function randomInt(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) throw new Error("min/max must be numbers");
  if (!Number.isInteger(min) || !Number.isInteger(max)) throw new Error("min/max must be integers");
  if (min > max) throw new Error("min must be <= max");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random element from an array
function pickRandom(arr) {
  if (!Array.isArray(arr)) throw new Error("arr must be an array");
  if (arr.length === 0) throw new Error("arr must not be empty");
  return arr[randomInt(0, arr.length - 1)];
}

// --- Quick demos (play) ---
console.log("Math.random():", Math.random()); // 0.0 ... 0.999999...
console.log("randomFloat(0, 100):", randomFloat(0, 100)); // 0.0 ... 99.999...
console.log("randomInt(1, 100):", randomInt(1, 100)); // 1 ... 100

const colors = ["red", "blue", "green", "yellow"];
console.log("pickRandom(colors):", pickRandom(colors));

console.log("10 dice rolls (1..6):", Array.from({ length: 10 }, () => randomInt(1, 6)).join(" "));

// --- Mini "guess the number" game ---
// Run: node exercise.js play
if (process.argv.includes("play")) {
  const readline = require("node:readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const secret = randomInt(1, 20);
  let tries = 0;

  console.log("\nGuess the number (1..20). Type 'q' to quit.");
  const ask = () => {
    rl.question("> ", (answer) => {
      const trimmed = answer.trim().toLowerCase();
      if (trimmed === "q") {
        rl.close();
        return;
      }
      const guess = Number(trimmed);
      if (!Number.isFinite(guess)) {
        console.log("Please enter a number.");
        return ask();
      }
      tries += 1;
      if (guess === secret) {
        console.log(`Correct! You took ${tries} tries.`);
        rl.close();
        return;
      }
      console.log(guess < secret ? "Too low" : "Too high");
      ask();
    });
  };

  ask();
}

// --- Tiny tests (sanity) ---
for (let i = 0; i < 200; i += 1) {
  const r = Math.random();
  assert(r >= 0 && r < 1, "Math.random range should be [0,1)");
}

for (let i = 0; i < 500; i += 1) {
  const n = randomInt(5, 8);
  assert(Number.isInteger(n), "randomInt returns integer");
  assert(n >= 5 && n <= 8, "randomInt in range");
}

for (let i = 0; i < 200; i += 1) {
  const v = pickRandom(colors);
  assert(colors.includes(v), "pickRandom returns element from array");
}

console.log("✅ Math.random lesson OK");
