class Animal {
  constructor() {
    this.breed = "animal";
  }

  bite(animal) {
    console.log(`${this.breed} bite ${animal.breed}`);
  }
}

class Dog extends Animal {
  constructor() {
    super();
    this.breed = "dog";
  }
}

class Person extends Animal {
  constructor() {
    super();
    this.breed = "person";
  }
}

new Dog().bite(new Person());
