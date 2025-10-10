---
id: "javascript-prototype-in-javascript"
title: "Prototype in JavaScript"
sidebar_label: "Prototype in JavaScript"
description: "Understanding the Prototype concept in JavaScript"
---

## Overview

In JavaScript, **prototype** is a mechanism by which objects inherit properties and methods from other objects. Every JavaScript object has an internal link to another object called its prototype.

## Why it matters

- Enables inheritance in JavaScript.
- Allows sharing methods across instances, saving memory.
- Forms the foundation of JavaScript's object-oriented programming.

## Key Concepts

### 1. Prototype Chain

The prototype chain is a series of objects linked together. When you access a property or method on an object, JavaScript looks up the chain until it finds the property or reaches the end of the chain.

```javascript
const obj = {};
console.log(obj.toString()); // Found in Object.prototype
```

### 2. `__proto__` vs `prototype`

- `__proto__`: Refers to the prototype of an instance.
- `prototype`: Refers to the prototype of a constructor function.

```javascript
function Person(name) {
  this.name = name;
}

const john = new Person("John");
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
```

### 3. Adding Methods to Prototypes

You can add methods to a constructor's prototype to share them across all instances.

```javascript
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log(`${this.name} says Woof!`);
};

const dog1 = new Dog("Buddy");
const dog2 = new Dog("Charlie");

dog1.bark(); // Buddy says Woof!
dog2.bark(); // Charlie says Woof!
```

### 4. Overriding Prototype Methods

You can override methods in the prototype for specific instances.

```javascript
dog1.bark = function () {
  console.log(`${this.name} says Bow-wow!`);
};

dog1.bark(); // Buddy says Bow-wow!
dog2.bark(); // Charlie says Woof!
```

## Examples

### Example 1: Prototype Inheritance

```javascript
function Animal(type) {
  this.type = type;
}

Animal.prototype.eat = function () {
  console.log(`${this.type} is eating.`);
};

function Cat(name) {
  this.name = name;
}

Cat.prototype = new Animal("Cat");
Cat.prototype.constructor = Cat;

const kitty = new Cat("Whiskers");
kitty.eat(); // Cat is eating.
```

### Example 2: Checking Prototype Chain

```javascript
console.log(kitty instanceof Cat); // true
console.log(kitty instanceof Animal); // true
console.log(kitty instanceof Object); // true
```

## Key Takeaways

- Prototypes enable inheritance and method sharing in JavaScript.
- Use `Object.create()` to create objects with a specific prototype.
- Avoid modifying `__proto__` directly; use `Object.getPrototypeOf()` and `Object.setPrototypeOf()` instead.

## Next Steps

- Explore ES6 classes, which provide a cleaner syntax for working with prototypes.
- Learn about `Object.create()` for creating objects with specific prototypes.
- Understand how prototypes work with built-in objects like `Array` and `Function`.
