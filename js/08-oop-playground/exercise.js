function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// TODO 1: Counter
// - constructor(start = 0): start se initial value set karo
// - inc(): value +1 karo, aur updated value return karo
// - dec(): value -1 karo, aur updated value return karo
// - value getter: current value ko expose karo (getter use hoga)
// Hint: value ko class ke andar store karo (jaise this._value)
class Counter {
  constructor(start = 0) {}
  inc() {}
  dec() {}
  get value() {}
}

// TODO 2: BankAccount (encapsulation)
// - private #balance field use karo, taaki bahar se direct change na ho
// - constructor(owner, balance = 0): owner set karo, #balance set karo
// - deposit(amount): amount add karo aur new balance return karo
// - withdraw(amount): amount subtract karo aur new balance return karo
// - agar amount <= 0 ho to Error("Invalid amount") throw karo
// - agar amount > balance ho to Error("Insufficient funds") throw karo
// - balance getter: current balance return kare
// Hint: private field ke liye #balance likhna hota hai
class BankAccount {
  constructor(owner, balance = 0) {}
  deposit(amount) {}
  withdraw(amount) {}
  get balance() {}
}

// TODO 3: SavingsAccount (inheritance + override)
// - BankAccount ko extend karo
// - constructor(owner, balance = 0, rate = 0.02)
// - applyInterest(): balance * rate ko deposit karo, new balance return karo
// - withdraw(amount): base withdraw ko use karo, lekin flat fee 1 add karo
//   Example: withdraw(9) => actually 10 withdraw hoga
// Hint: super(...) se parent constructor call hota hai
class SavingsAccount extends BankAccount {
  constructor(owner, balance = 0, rate = 0.02) {
    super(owner, balance);
  }
  applyInterest() {}
  withdraw(amount) {}
}

// TODO 4: Polymorphism
// - Shape base class: area() method default me Error("Not implemented") throw kare
// - Circle(radius) aur Rectangle(width, height) Shape ko extend karein
// - area() ko override karke correct area return karein
// - totalArea(shapes): sab shapes ka area sum karke return karo
// Hint: polymorphism ka matlab hai same method name, different behavior
class Shape {
  area() {
    throw new Error("Not implemented");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
  }
  area() {}
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
  }
  area() {}
}

function totalArea(shapes) {
  return 0;
}

// TODO 5: transfer(from, to, amount)
// - from se withdraw karo, to me deposit karo
// - return { fromBalance, toBalance }
// - agar withdraw fail ho, to deposit nahi hona chahiye
// Hint: pehle withdraw karo, agar success ho to deposit karo
function transfer(from, to, amount) {
  return { fromBalance: 0, toBalance: 0 };
}

// Tests (do not change)
const counter = new Counter(2);
assert(counter.value === 2, "counter initial");
assert(counter.inc() === 3, "counter inc");
assert(counter.dec() === 2, "counter dec");

const account = new BankAccount("A", 10);
assert(account.balance === 10, "account initial");
assert(account.deposit(5) === 15, "deposit");
assert(account.withdraw(4) === 11, "withdraw");
let failed = false;
try {
  account.withdraw(99);
} catch (e) {
  failed = e.message === "Insufficient funds";
}
assert(failed, "insufficient funds error");

const savings = new SavingsAccount("B", 100, 0.1);
assert(savings.applyInterest() === 110, "apply interest");
assert(savings.withdraw(9) === 100, "withdraw with fee");

const shapes = [new Circle(2), new Rectangle(3, 4)];
const area = totalArea(shapes);
assert(Math.round(area) === Math.round(Math.PI * 4 + 12), "total area");

const a1 = new BankAccount("C", 50);
const a2 = new BankAccount("D", 5);
const moved = transfer(a1, a2, 20);
assert(moved.fromBalance === 30, "transfer from");
assert(moved.toBalance === 25, "transfer to");

console.log("OK - OOP playground tests passed");
