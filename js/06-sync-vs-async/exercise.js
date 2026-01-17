// Sync vs Async exercises (Hinglish)
//
// Run:
//   node exercise.js
//
// Aapko TODOs complete karne hain. Neeche tests pass hone chahiye.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO 1: implement sleepLog(ms, label)
// - ms wait karo
// - then return `${label} after ${ms}`
async function sleepLog(ms, label) {
  return "";
}

// TODO 2: implement runSequential(tasks)
// - tasks: array of functions returning promises
// - one-by-one await karo
// - results array return karo
async function runSequential(tasks) {
  return [];
}

// TODO 3: implement runParallel(tasks)
// - tasks ko ek saath start karo
// - Promise.all se results return karo
async function runParallel(tasks) {
  return [];
}

// TODO 4: implement withTimeout(promise, ms)
// - promise agar ms me complete na ho, reject with Error("Timed out")
function withTimeout(promise, ms) {
  return promise;
}

(async () => {
  // Tests
  const r1 = await sleepLog(20, "A");
  assert(r1 === "A after 20", "sleepLog output");

  const tasks = [
    () => wait(30).then(() => "one"),
    () => wait(10).then(() => "two"),
    () => wait(20).then(() => "three"),
  ];

  const sStart = Date.now();
  const seq = await runSequential(tasks);
  const sTook = Date.now() - sStart;
  assert(JSON.stringify(seq) === JSON.stringify(["one", "two", "three"]), "sequential order");
  assert(sTook >= 55, "sequential time should be roughly sum (>=55ms)");

  const pStart = Date.now();
  const par = await runParallel(tasks);
  const pTook = Date.now() - pStart;
  assert(JSON.stringify(par) === JSON.stringify(["one", "two", "three"]), "parallel order");
  assert(pTook < sTook, "parallel should be faster than sequential");

  try {
    await withTimeout(wait(50), 10);
    assert(false, "should timeout");
  } catch (e) {
    assert(e.message === "Timed out", "timeout message");
  }

  console.log("✅ Sync vs Async exercises passed");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

