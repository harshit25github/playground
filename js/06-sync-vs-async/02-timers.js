// 02 - Timers demo (Hinglish)
//
// Is file me hum `setTimeout` aur `setInterval` ko practically samjhenge.
//
// Important concepts:
// - JS me timer "exact time" guarantee nahi hota. Timer callback tabhi chalega jab:
//   1) call stack empty ho (koi sync code chal nahi raha ho)
//   2) event loop ko chance mile (blocked na ho)
//
// 1) setTimeout(fn, delayMs)
// - fn ek baar run hota hai, at least delayMs ke baad.
// - "at least" isliye, kyunki agar main thread busy hai to aur late ho sakta hai.
//
// 2) setInterval(fn, intervalMs)
// - fn repeat hota rehta hai har intervalMs (approx).
// - Stop karne ke liye `clearInterval(id)` use karte hain.
//
// Expected output order:
// - "Start" and "End (sync part finished)" pehle print honge (sync).
// - phir interval ticks + timeout log aayenge (async callbacks).

console.log("Start");

// setTimeout: 300ms ke around ek baar fire


// setInterval: 200ms ke around repeat hota rahega
let ticks = 0;
const id = setInterval(() => {
  ticks += 1; // har run pe tick count increase
  console.log(`B) interval tick ${ticks}`);

}, 200);

setTimeout(() => {
  console.log("A) setTimeout after ~8 sec");
  // 3 ticks ke baad stop (warna interval infinitely chalta rahega)
  
    clearInterval(id); // cleanup: interval stop
    console.log("C) interval cleared");
  
}, 8000);

// Ye line immediately print ho jaati hai, kyunki timers async hain.
console.log("End (sync part finished)");
