# 06 - Sync vs Async (Event Loop) Playground

Goal: sync/async ko practically samajhna — **call stack**, **task queue**, **microtask queue**, timers, Promises, `async/await`, parallel vs sequential.

## Run

Har file ko run karo:

```sh
node 01-sync-blocking.js
node 02-timers.js
node 03-microtasks-vs-macrotasks.js
node 04-async-await.js
node 05-parallel-vs-sequential.js
node 06-errors.js
node exercise.js
```

## Key ideas (short Hinglish)

- **Sync**: code line-by-line run hota hai; jab tak current kaam complete na ho, next line nahi chalegi.
- **Async**: kaam schedule hota hai (timer/network/file), aur main thread aage chal jata hai; result baad me aata hai.
- **Event loop**: JS ka “traffic police” — stack empty hota hai to queues se tasks pick karta hai.
- **Microtasks**: `Promise.then` / `queueMicrotask` — usually **timer se pehle** run hote hain.
- **Macrotasks**: `setTimeout`, `setInterval`, I/O callbacks — next “tick” me aate hain.

Tip: output ko predict karo, phir run karke verify.

