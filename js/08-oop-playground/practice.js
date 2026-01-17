// Section 1  
const user = {
    name: "harsh",
    email:'harsh@',
    
    login(){
        return this.email + " logged in";
    }
}


class User{
    constructor(name,email){
        this.name = name;
        this.email = email;
    }
    login() {
    console.log(this.email + " logged in");
   } 

}


const u1 = new User("harsh","harsh@");
u1.login()

const u2 = new User("john","john@");
u2.login();


const product = {
    name:"Laptop",
    price:1000,
    discountedPrice(){
        return this.price *Math.floor(Math.random()*100)/100;
    }
}

console.log(product.discountedPrice());

// Section 2 

class Student {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    info() {
      return `${this.name} is ${this.age} years old.`;
    }
   
}
 

const s1 = new Student("Alice", 20);
console.log(s1.info());


const std = {
    name : "Bob",
    age:22,
    info1:function(){
        console.log(this); // will log std object
        return `${this.name} is ${this.age} years old.`;
    },
    info2: () => {
        console.log(this); // will log global object / window
        return `${this.name} is ${this.age} years old.`; // this will not work as expected
    }
}


console.log(std.info1());
console.log(std.info2()); // undefined is undefined years old.


// Section 3

function Customer(name, balance) {
    this.name = name;
    this.balance = balance;
    this.login = function() {
        return this.name + " logged in";
    }
}


const c1 = new Customer("Charlie", 500);
Customer.prototype.deposit = function(amount) {
    this.balance += amount;
    return this.balance;
}
console.log(c1);
console.log(c1.login());


console.log(c1.deposit(100));
console.log(c1.__proto__); // will log all the shared methods of Customer prototype
console.log(Object.getPrototypeOf(c1)); // same as above



// Section 4 -- call , apply , bind
function intro(city, role) {
  console.log(`Hi, I am ${this.name} from ${city}. Role: ${role}`);
}

const usr = { name: "Brad" };
//call:
//Call ka scene simple hai. Tum directly function ko call karte ho aur pehla argument dete ho ki this kya hoga. Uske baad wale arguments actual function ke parameters hote hain.


intro.call(user, "Delhi", "SDE");

//apply:
//Apply aur call bhai-bhai hain, bas ek chhota sa difference hai. Arguments dene ka tareeka. Call me tum comma-separated arguments dete ho, apply me tum arguments ek array me dete ho.

intro.apply(user, ["Mumbai", "Fullstack"]);

//bind:
//Bind thoda alag hai. Ye function ko call nahi karta, balki ek naya function return karta hai jisme this aur kuch arguments pre-set hote hain. Jab tum us naye function ko call karoge, tab wo pre-set values use karega.const introUser = intro.bind(user);
const introUser = intro.bind(user);
introUser("Pune", "GenAI Dev");
