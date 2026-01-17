"use strict";

// this keyword: detailed exercises (Hinglish)
// Run examples: node this-exercises.js
// Run practice: node this-exercises.js practice

class SectionPrinter {
  static section(title) {
    console.log("\n=== " + title + " ===");
  }
}

function safeCall(label, fn) {
  try {
    console.log(label + ":", fn());
  } catch (e) {
    console.log(label + " error:", e.message);
  }
}

// Rule 1: implicit binding (obj.method())
// - jab method object ke through call hota hai, this = object
SectionPrinter.section("Rule 1: implicit binding (obj.method)");
const user = {
  name: "Riya",
  greet() {
    return "Hi " + this.name;
  },
};

safeCall("method call", () => user.greet());
const detachedGreet = user.greet; // reference nikala, context gaya
safeCall("detached call", detachedGreet); // this undefined in strict mode

// Rule 2: explicit binding (call/apply/bind)
// - call/apply: turant call with this set
// - bind: naya function banata hai jisme this fix ho jata hai
SectionPrinter.section("Rule 2: explicit binding (call/apply/bind)");
safeCall("call", () => detachedGreet.call(user));
safeCall("apply", () => detachedGreet.apply(user));
const boundGreet = detachedGreet.bind(user);
safeCall("bind", boundGreet);

// Rule 3: new binding (class constructor)
// - new ke sath call karoge to this = naya object
SectionPrinter.section("Rule 3: new binding (class)");
class Counter {
  constructor(start = 0) {
    this.value = start;
  }

  inc() {
    this.value += 1;
    return this.value;
  }
}

const c = new Counter(1);
safeCall("instance method", () => c.inc());
const detachedInc = c.inc;
safeCall("detached inc", detachedInc); // context lost, error expected

// Rule 4: arrow function ka this (lexical)
// - arrow function apna this nahi banata, parent ka this use karta hai
// - normal function apna this banata hai (call site pe depend)
SectionPrinter.section("Rule 4: arrow lexical this");
const box = {
  name: "Box",
  count: 0,
  showWithFunction() {
    setTimeout(function () {
      // yaha this setTimeout ka context ho sakta hai, box nahi
      console.log("function this.name:", this && this.name);
    }, 0);
  },
  showWithArrow() {
    setTimeout(() => {
      // arrow parent ka this use karega, yaha parent = box
      this.count += 1;
      console.log("arrow this.name:", this.name, "count:", this.count);
    }, 0);
  },
};

box.showWithFunction();
box.showWithArrow();

if (process.argv.includes("practice")) {
  SectionPrinter.section("Practice (Fill TODOs)");

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  // TODO 1: makeBoundGreet(obj)
  // - obj ke greet method ko bind karke return karo
  // - return function call karne par this lost na ho
  function makeBoundGreet(obj) {
    // TODO: bind use karo
    return function () {};
  }

  const person = {
    name: "Meera",
    greet() {
      return "Hi " + this.name;
    },
  };
  const fixedGreet = makeBoundGreet(person);
  assert(fixedGreet() === "Hi Meera", "bind fix");

  // TODO 2: callWith(ctx, fn, ...args)
  // - fn ko ctx ke sath call karo, args forward karo
  function callWith(ctx, fn, ...args) {
    // TODO: call use karo
    return "";
  }

  function introduce(city, role) {
    return this.name + " - " + city + " - " + role;
  }
  const ctx = { name: "Dev" };
  assert(callWith(ctx, introduce, "Pune", "Engineer") === "Dev - Pune - Engineer", "callWith");

  // TODO 3: method reference fix with bind
  class Meter {
    constructor() {
      this.count = 0;
    }

    tick() {
      this.count += 1;
      return this.count;
    }
  }

  const meter = new Meter();
  const looseTick = meter.tick;
  // TODO: looseTick ko bind karke boundTick banao
  const boundTick = null;
  assert(boundTick() === 1, "bound tick 1");
  assert(boundTick() === 2, "bound tick 2");

  console.log("OK - this practice tasks passed");
}
