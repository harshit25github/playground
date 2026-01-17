// 03 - Microtasks vs Macrotasks (Hinglish)
//
// Rule of thumb:
// - Sync code pehle
// - Microtasks (Promise.then / queueMicrotask) usually next
// - Macrotasks (setTimeout) uske baad
//
// Output predict karke run karo.

console.log("1) sync start");

setTimeout(() => console.log("6) macrotask: setTimeout"), 0);

Promise.resolve()
  .then(() => console.log("4) microtask: promise.then #1"))
  .then(() => console.log("5) microtask: promise.then #2"));

queueMicrotask(() => console.log("3) microtask: queueMicrotask"));

console.log("2) sync end");

// Typical order (note: microtasks FIFO hote hain, jo pehle queue hota hai wo pehle chalega):
// 1) sync start
// 2) sync end
// 3) promise.then #1
// 4) queueMicrotask
// 5) promise.then #2 (yeh #1 ke baad chain me add hota hai)
// 6) setTimeout
