function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// TODO 1: makeCounter() returns an object:
// { inc(): number, dec(): number, value(): number }
// It should keep state private using closure.
function makeCounter() {
  return {
    inc() {},
    dec() {},
    value() {},
  };
}

// TODO 2: once(fn) returns a new function that calls fn only once.
// Next calls return the first result.
function once(fn) {
  return function () {};
}

// Tests (don’t change)
const c = makeCounter();
assert(c.value() === 0, "starts at 0");
assert(c.inc() === 1, "inc 1");
assert(c.inc() === 2, "inc 2");
assert(c.dec() === 1, "dec 1");
assert(c.value() === 1, "value 1");

let calls = 0;
const get = once(() => {
  calls += 1;
  return 123;
});
assert(get() === 123, "first call");
assert(get() === 123, "second call returns same");
assert(calls === 1, "fn called once");

console.log("✅ All tests passed");

// ------------------------------------------------------------------

//scope chain 

let  b = 20; // global scope
function abcd(){
  let a =10; //
  function xyz(){

    return a + b; // inner function can access outer function variable and global variable - lexical scope
  }
}

// Types of Funmctions

// 1. Higher Order Function - function that returns another function
function greet(){
  return function(){
    console.log("Hello World");
  }
}
// 2. Callback Function - function passed as argument to another function
function greet2(fn){
  fn();
}

greet2(function(){
  console.log("Hello from greet2");
});

// 3. First Class Function - in JS functions are first class citizens - can be assigned to variable, passed as argument, returned from function
function greet3(){
  console.log("Hello from greet3");
}

let sayHello = greet3; // function can be assigned to variable
sayHello(); // calling function using variable 

// 4. Impure Function - function that modifies external state or has side effects - can be called multiple times
let count = 0; // external state
function impureFunction(){
  count++; // modifies external state
  return count;
}



//closure - function inside function can access outer function variable even after outer function has returned
function outerFunction(outerVariable){
  return function innerFunction(innerVariable){
    console.log("Outer Variable: " + outerVariable);
    console.log("Inner Variable: " + innerVariable);
  }
}

const newFunction = outerFunction("outside");
newFunction("inside");