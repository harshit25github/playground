// 05 - Parallel vs Sequential (Hinglish)
//
// Sequential: await one-by-one => total time add ho jata hai
// Parallel: Promise.all => total time max of tasks (usually faster)

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function job(name, ms) {
  await wait(ms);
  return `${name} (${ms}ms)`;
}

async function sequential() {
  const start = Date.now();
  const a = await job("A", 300);
  const b = await job("B", 400);
  const c = await job("C", 200);
  return { results: [a, b, c], tookMs: Date.now() - start };
}

async function parallel() {
  const start = Date.now();
  const results = await Promise.all([job("A", 300), job("B", 400), job("C", 200)]);
  return { results, tookMs: Date.now() - start };
}

(async () => {
  const s = await sequential();
  console.log("Sequential results:", s.results.join(", "));
  console.log("Sequential took ~", s.tookMs, "ms");

  const p = await parallel();
  console.log("Parallel results:", p.results.join(", "));
  console.log("Parallel took ~", p.tookMs, "ms");
})();

