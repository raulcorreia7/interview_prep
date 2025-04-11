# TypeScript Interfaces

This document covers TypeScript interfaces across three levels of expertise: Basic, Advanced, and Mastery.

## Table of Contents
- [Basic Level](#basic-level)
- [Advanced Level](#advanced-level)
- [Mastery Level](#mastery-level)

## Basic Level

### Basic Interface Structure
```typescript
interface Person {
    name: string;
    age: number;
    greet(): string;
}

class Employee implements Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}
```

### Optional Properties
```typescript
interface User {
    name: string;
    email: string;
    phone?: string;  // Optional property
}

const user1: User = {
    name: "John",
    email: "john@example.com"
};

const user2: User = {
    name: "Jane",
    email: "jane@example.com",
    phone: "123-456-7890"
};
```

### Readonly Properties
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 30;  // Error: Cannot assign to 'x' because it is a read-only property
```

## Advanced Level

### Function Types
```typescript
interface SearchFunction {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunction = function(source: string, subString: string): boolean {
    return source.includes(subString);
};
```

### Indexable Types
```typescript
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred"];
const myStr: string = myArray[0];
```

### Extending Interfaces
```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

const square: Square = {
    color: "blue",
    sideLength: 10
};
```

## Mastery Level

### Hybrid Types
```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number) { return start.toString(); } as Counter;
    counter.interval = 123;
    counter.reset = function() { this.interval = 0; };
    return counter;
}

const c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### Generic Interfaces
```typescript
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

const pair1: KeyValuePair<number, string> = {
    key: 1,
    value: "one"
};

const pair2: KeyValuePair<string, boolean> = {
    key: "isActive",
    value: true
};
```

### Mapped Types with Interfaces
```typescript
interface Person {
    name: string;
    age: number;
    email: string;
}

type ReadonlyPerson = Readonly<Person>;
type PartialPerson = Partial<Person>;
type PickPerson = Pick<Person, 'name' | 'age'>;
type OmitPerson = Omit<Person, 'email'>;

const readonlyPerson: ReadonlyPerson = {
    name: "John",
    age: 30,
    email: "john@example.com"
};

// readonlyPerson.name = "Jane";  // Error: Cannot assign to 'name' because it is a read-only property
```

## Best Practices

### Basic
- Use interfaces to define object shapes
- Keep interfaces focused and single-purpose
- Use meaningful property names

### Advanced
- Use interfaces for function types
- Leverage interface extension for code reuse
- Use index signatures for dynamic properties

### Mastery
- Create generic interfaces for reusable components
- Use mapped types to transform interfaces
- Combine multiple interface features for complex types 