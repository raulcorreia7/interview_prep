# Classes in TypeScript

## Class Basics [Core]

### Class Declaration [Core]
```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}
```

### Access Modifiers [Core]
```typescript
class BankAccount {
  private balance: number;
  public readonly accountNumber: string;
  protected owner: string;

  constructor(accountNumber: string, owner: string) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = 0;
  }
}
```

## Inheritance [Common]

### Basic Inheritance [Common]
```typescript
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Woof! Woof!");
  }
}
```

### Method Overriding [Common]
```typescript
class Animal {
  move(distance: number): void {
    console.log(`Animal moved ${distance}m.`);
  }
}

class Snake extends Animal {
  move(distance: number): void {
    console.log("Slithering...");
    super.move(distance);
  }
}
```

## Advanced Features [Advanced]

### Abstract Classes [Advanced]
```typescript
abstract class Animal {
  abstract makeSound(): void;
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

### Static Members [Common]
```typescript
class MathHelper {
  static PI: number = 3.14159;
  
  static calculateArea(radius: number): number {
    return this.PI * radius * radius;
  }
}
```

## Interfaces and Classes [Common]

### Implementing Interfaces [Common]
```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  setTime(d: Date): void {
    this.currentTime = d;
  }
}
```

### Class as Interface [Advanced]
```typescript
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}
```

## Best Practices [Core]

1. Use access modifiers appropriately
2. Prefer composition over inheritance
3. Use abstract classes for common behavior
4. Implement interfaces for contracts
5. Use readonly for immutable properties
6. Consider using static members [Common]
7. Use proper method visibility [Common]
8. Document public APIs
9. Use proper constructor patterns
10. Consider using factory methods [Advanced]

## Common Patterns [Common]

### Singleton Pattern [Common]
```typescript
class Database {
  private static instance: Database;
  
  private constructor() {}
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

### Factory Pattern [Common]
```typescript
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class AnimalFactory {
  static createAnimal(type: string): Animal {
    switch (type) {
      case "dog": return new Dog();
      default: throw new Error("Invalid animal type");
    }
  }
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Class declaration and instantiation
- Access modifiers
- Basic inheritance
- Constructor usage
- Method definition

### Common Interview Questions [Common]
- What's the difference between public, private, and protected?
- How does inheritance work in TypeScript?
- What are abstract classes and when should you use them?
- How do you implement interfaces in classes?

### Advanced Topics [Advanced]
- Abstract classes and methods
- Static members and methods
- Advanced inheritance patterns
- Mixins and multiple inheritance

### Mastery Level [Mastery]
- Complex design patterns
- Advanced class composition
- Performance optimization in classes
- Advanced type system features with classes 