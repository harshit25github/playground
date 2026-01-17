// 04 - async/await flow (Hinglish)
//
// async function hamesha Promise return karti hai.
// await: promise resolve hone ka wait karta hai (function ke andar), but main thread block nahi hota.

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("1) main start");

  console.log("2) waiting 300ms...");
  await wait(300);

  console.log("3) after 300ms");

  console.log("4) waiting 100ms...");
  await wait(100);

  console.log("5) done");
}

console.log("0) before main()");
main(); // promise start, but we don't await here
console.log("0.5) after main() call (sync continues)");

