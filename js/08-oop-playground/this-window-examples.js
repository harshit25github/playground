// this functionality (Hinglish examples)
// Run: node this-window-examples.js
// Note: Browser me global = window, Node me global = globalThis

function section(title) {
  console.log("\n=== " + title + " ===");
}

const root = typeof window !== "undefined" ? window : globalThis;

function show(label, value) {
  const isGlobal = value === root;
  console.log(label + " ->", isGlobal ? "[global]" : value);
}

// 1) global -> window
section("1) global -> window");
// Browser (non-strict) me top-level this = window hota hai.
// Node me top-level this = {} (module.exports) hota hai.
show("top-level this === global?", this === root);

// 2) function -> window
section("2) function -> window (non-strict)");
function normalFn() {
  // non-strict function call me this = global object hota hai
  return this;
}
show("normalFn() === global?", normalFn() === root);

// 3) es5 function inside object -> object
section("3) es5 function inside object -> object");
const objES5 = {
  name: "ObjES5",
  getName: function () {
    return this.name;
  },
  getThis: function () {
    return this;
  },
};
show("objES5.getName()", objES5.getName());
show("objES5.getThis() === objES5?", objES5.getThis() === objES5);

// 4) es6 function inside object -> window (arrow)
section("4) es6 function inside object -> window (arrow)");
// Arrow function apna this nahi banata, outer this use karta hai.
// Is example me arrow ka outer this global set karne ke liye wrapper use kiya hai.
const objArrow ={
  name:'hjarsh',
  getThis: () =>{
    console.log(this); // will log global object / window
    return this;
  }
}
show("objArrow.getThis() === global?", objArrow.getThis() === root);

// 5) es5 function inside es5 function inside object -> window
section("5) es5 inside es5 inside object -> window");
const objNestedES5 = {
  name: "NestedES5",
  outer: function () {
    function inner() {
      // yaha normal function call ho raha hai, isliye this global
      return this; // global object / window
    }
    return inner();
  },
};
show("objNestedES5.outer() === global?", objNestedES5.outer() === root);

// 6) es6 function inside es5 function inside object -> window
section("6) es6 inside es5 inside object -> window (context lost)");
const objMixed = {
  name: "Mixed",
  outer: function () {
    const innerArrow = () => this; // arrow outer ka this lega
    return innerArrow();
  },
};

// Direct call: outer ka this = objMixed, arrow bhi objMixed lega
show("objMixed.outer() === objMixed?", objMixed.outer() === objMixed);

// Agar outer detach ho jaye, to outer ka this global ho jayega,
// aur arrow bhi wahi use karega
const looseOuter = objMixed.outer;
show("looseOuter() === global?", looseOuter() === root);

console.log("\nNote:");
console.log("- Browser non-strict: normal function() call => this = window");
console.log("- Arrow function: this outer scope se leta hai");
console.log("- Method detach hone par context lost ho sakta hai");
