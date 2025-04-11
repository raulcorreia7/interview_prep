# TypeScript Classes

This document covers TypeScript classes across three levels of expertise: Basic, Advanced, and Mastery.

## Table of Contents
- [Basic Level](#basic-level)
- [Advanced Level](#advanced-level)
- [Mastery Level](#mastery-level)

## Basic Level

### Basic Class Structure
```typescript
class Person {
    // Properties
    name: string;
    age: number;

    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method
    greet(): string {
        return `Hello, my name is ${this.name}`;
    }
}

// Usage
const person = new Person("John", 30);
console.log(person.greet());
```

### Access Modifiers
```typescript
class BankAccount {
    private balance: number;
    public accountNumber: string;

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}
```

## Advanced Level

### Inheritance
```typescript
class Animal {
    constructor(public name: string) {}

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog('Rex');
dog.bark();
dog.move(10);
```

### Abstract Classes
```typescript
abstract class Shape {
    abstract getArea(): number;
    
    printArea(): void {
        console.log(`Area: ${this.getArea()}`);
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle(5);
circle.printArea();
```

### Static Members
```typescript
class MathHelper {
    static PI: number = 3.14159;
    
    static calculateCircleArea(radius: number): number {
        return this.PI * radius * radius;
    }
}

console.log(MathHelper.calculateCircleArea(5));
```

## Mastery Level

### Decorators
```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
    
    return descriptor;
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
```

### Mixins
```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = new Date();
    };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isActive = false;
        
        activate() {
            this.isActive = true;
        }
        
        deactivate() {
            this.isActive = false;
        }
    };
}

class User {
    constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);
const TimestampedActivatableUser = Activatable(TimestampedUser);

const user = new TimestampedActivatableUser("John");
user.activate();
console.log(user.timestamp, user.isActive);
```

### Generic Classes
```typescript
class DataStore<T> {
    private data: T[] = [];

    add(item: T): void {
        this.data.push(item);
    }

    get(index: number): T {
        return this.data[index];
    }

    getAll(): T[] {
        return [...this.data];
    }
}

// Usage with different types
const stringStore = new DataStore<string>();
stringStore.add("Hello");
stringStore.add("World");

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);
```

## Best Practices

### Basic
- Use access modifiers (public, private, protected) appropriately
- Keep classes focused on a single responsibility
- Use meaningful property and method names

### Advanced
- Leverage inheritance for code reuse
- Use abstract classes for common behavior
- Implement interfaces for better type safety

### Mastery
- Use decorators for cross-cutting concerns
- Implement mixins for flexible composition
- Create generic classes for type-safe reusable components 