// 01 - Sync blocking demo (Hinglish)
//
// Idea:
// - JS single-threaded hota hai (main thread).
// - Agar aap heavy sync kaam (CPU loop) karoge, to event loop block ho jayega.
// - Iska effect: setTimeout jaise timers bhi late fire hote hain.

console.log("1) Start (sync)");

setTimeout(() => {
  console.log("4) setTimeout callback (should be ~0ms, but blocking delays it)");
}, 0);

console.log("2) Timer scheduled, ab heavy sync kaam...");

// Heavy sync loop (blocking)
const start = Date.now();
while (Date.now() - start < 800) {
  // 800ms tak busy wait (bad practice, sirf demo)
}

console.log("3) Heavy sync done (after ~800ms)");

// Expected order:
// 1) Start
// 2) Timer scheduled...
// 3) Heavy sync done...
// 4) setTimeout callback...

