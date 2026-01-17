// OOP: prototype vs instance (Hinglish)
// Run examples: node ex.js
// Run practice: node ex.js practice

class SectionPrinter {
  static section(title) {
    console.log("\n=== " + title + " ===");
  }
}

// 1) Shared value on prototype (BUG example)
SectionPrinter.section("1) Shared value on prototype (bug)");
class BadBox {
  constructor(name) {
    this.name = name;
  }

  add(item) {
    this.items.push(item);
  }
}

// items array prototype pe hai, isliye sab instances share karenge
BadBox.prototype.items = [];

const b1 = new BadBox("b1");
const b2 = new BadBox("b2");

b1.add("apple");
console.log("b1.items:", b1.items);
console.log("b2.items:", b2.items);
console.log("same array?", b1.items === b2.items); // true

// Prototype dekhne ke liye
console.log("b1 proto:", Object.getPrototypeOf(b1));
console.log("b2 proto:", Object.getPrototypeOf(b2));
console.log("same prototype?", Object.getPrototypeOf(b1) === Object.getPrototypeOf(b2));

// 2) Instance value (SAFE example)
SectionPrinter.section("2) Instance value (safe)");
class GoodBox {
  constructor(name) {
    this.name = name;
    this.items = []; // har instance ka apna array
  }

  add(item) {
    this.items.push(item);
  }
}

const g1 = new GoodBox("g1");
const g2 = new GoodBox("g2");

g1.add("banana");
console.log("g1.items:", g1.items);
console.log("g2.items:", g2.items);
console.log("same array?", g1.items === g2.items); // false

// 3) Shared function on prototype (GOOD)
SectionPrinter.section("3) Shared function on prototype");
class User {
  constructor(name) {
    this.name = name;
  }

  // sayHi prototype par hai, sab instances same function share karte hain
  sayHi() {
    return "Hi " + this.name;
  }
}

const u1 = new User("A");
const u2 = new User("B");

console.log(u1.sayHi());
console.log(u2.sayHi());
console.log("same function?", u1.sayHi === u2.sayHi); // true

// 4) Instance function (NOT shared)
SectionPrinter.section("4) Instance function (not shared)");
class User2 {
  constructor(name) {
    this.name = name;
    // har object ke paas apni function copy hogi
    this.sayHi = function () {
      return "Hi " + this.name;
    };
  }
}

const x1 = new User2("X");
const x2 = new User2("Y");

console.log(x1.sayHi());
console.log(x2.sayHi());
console.log("same function?", x1.sayHi === x2.sayHi); // false

if (process.argv.includes("practice")) {
  SectionPrinter.section("5) Practice (Fill TODOs)");

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  // TODO A: Team class
  // - constructor(name): name set karo, members array instance par banao
  // - add(member): members me push karo, duplicate allowed hain
  // - size getter: current members count return karo
  // - list(): members ka copy return karo (original ko mutate na karo)
  class Team {
    constructor(name) {
      this.name = name;
      this._members = [];
    }

    add(member) {
      // TODO: member add karo
    }

    get size() {
      // TODO: members count return karo
      return -1;
    }

    list() {
      // TODO: copy return karo (slice ya spread)
      return [];
    }
  }

  const t1 = new Team("Alpha");
  const t2 = new Team("Beta");
  t1.add("A");
  t1.add("B");
  assert(t1.size === 2, "team size");
  assert(t2.size === 0, "team separate instances");
  const listCopy = t1.list();
  listCopy.push("X");
  assert(t1.size === 2, "list returns copy");
  assert(t1.add === t2.add, "class methods are shared via prototype");

  // TODO B: Wallet class (encapsulation)
  // - private #balance field use karo
  // - constructor(owner, balance = 0)
  // - deposit(amount): amount > 0 ho, balance add karo, new balance return karo
  // - withdraw(amount): amount > 0 ho, balance >= amount ho, subtract karo, new balance return karo
  // - invalid amount => Error("Invalid amount")
  // - insufficient funds => Error("Insufficient funds")
  // - balance getter: current balance return karo
  class Wallet {
    constructor(owner, balance = 0) {
      this.owner = owner;
      // TODO: #balance set karo
    }

    deposit(amount) {
      // TODO: validation + add
      return -1;
    }

    withdraw(amount) {
      // TODO: validation + subtract
      return -1;
    }

    get balance() {
      // TODO: return #balance
      return -1;
    }
  }

  const w1 = new Wallet("Riya", 10);
  assert(w1.balance === 10, "wallet initial");
  assert(w1.deposit(5) === 15, "wallet deposit");
  assert(w1.withdraw(4) === 11, "wallet withdraw");
  let invalidFailed = false;
  try {
    w1.deposit(0);
  } catch (e) {
    invalidFailed = e.message === "Invalid amount";
  }
  assert(invalidFailed, "wallet invalid amount");
  let insufficientFailed = false;
  try {
    w1.withdraw(99);
  } catch (e) {
    insufficientFailed = e.message === "Insufficient funds";
  }
  assert(insufficientFailed, "wallet insufficient funds");

  // TODO C: Person + Student (inheritance + override)
  // - Person: constructor(first, last), fullName() return "First Last"
  // - Student extends Person: constructor(first, last, grade)
  // - introduce(): "Hi, I'm <FullName> from grade <grade>"
  class Person {
    constructor(first, last) {
      this.first = first;
      this.last = last;
    }

    fullName() {
      // TODO: full name return karo
      return "";
    }
  }

  class Student extends Person {
    constructor(first, last, grade) {
      super(first, last);
      this.grade = grade;
    }

    introduce() {
      // TODO: fullName() use karke intro return karo
      return "";
    }
  }

  const s1 = new Student("Asha", "Verma", 10);
  assert(s1.fullName() === "Asha Verma", "student fullName");
  assert(s1.introduce() === "Hi, I'm Asha Verma from grade 10", "student introduce");

  console.log("OK - practice tasks passed");
}


console.log("\n=== Additional OOP Examples ===");
// Class
class Animal{
    constructor(hands,legs){
        this.hands = hands;
        this.legs = legs;
        this._alive = true; // private property convention
    }
    set nLegs(num){
        if(num < 0){
            console.log("Legs cannot be negative");
            return;
        }
        this.legs = num;
    }
    get nLegs(){

        return this.legs;
    }
    eat(){
        console.log(` is eating`);
    }
    sleep(){
        console.log(` is sleeping`);
    }
    breathe(){
        console.log(` is breathing`);
    }
}
const animal1 = new Animal(0,4);
animal1.legs = 10
animal1.nLegs = -5; // setter called
console.log(animal1.nLegs);
// Inheritance
class Dog extends Animal{
    constructor(name,breed){
        // this.legs = 4;
        // this.hands = 0
        this.name = name;
        this.breed = breed;
    }
    khmbeyPeyMutna(){
        console.log(`${this.name} is mooting on khmbey`);
    }
}
