// 06 - Error handling in async (Hinglish)
//
// 1) try/catch works with await
// 2) Promise.all => ek fail => poora reject
// 3) Promise.allSettled => sabka result milta hai (success/fail)

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mayFail(name, ms, shouldFail) {
  await wait(ms);
  if (shouldFail) throw new Error(`${name} failed`);
  return `${name} ok`;
}

(async () => {
  // try/catch with await
  try {
    const x = await mayFail("X", 100, true);
    console.log("X:", x);
  } catch (e) {
    console.log("Caught error:", e.message);
  }

  // Promise.all (fail-fast)
  try {
    const r = await Promise.all([
      mayFail("A", 200, false),
      mayFail("B", 150, true),
      mayFail("C", 100, false),
    ]);
    console.log("ALL:", r);
  } catch (e) {
    console.log("Promise.all rejected:", e.message);
  }

  // Promise.allSettled (collect results)
  const settled = await Promise.allSettled([
    mayFail("A", 80, false),
    mayFail("B", 60, true),
    mayFail("C", 40, false),
  ]);

  console.log(
    "allSettled summary:",
    settled.map((x) => (x.status === "fulfilled" ? x.value : x.reason.message)).join(" | "),
  );
})();

