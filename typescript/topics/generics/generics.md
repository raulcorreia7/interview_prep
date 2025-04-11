# TypeScript Generics

This document covers TypeScript generics across three levels of expertise: Basic, Advanced, and Mastery.

## Table of Contents
- [Basic Level](#basic-level)
- [Advanced Level](#advanced-level)
- [Mastery Level](#mastery-level)

## Basic Level

### Basic Generic Functions
```typescript
function identity<T>(arg: T): T {
    return arg;
}

// Usage
let output1 = identity<string>("hello");
let output2 = identity<number>(42);
let output3 = identity("hello"); // Type inference
```

### Generic Interfaces
```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### Generic Classes
```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## Advanced Level

### Generic Constraints
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Usage
loggingIdentity("hello"); // OK
loggingIdentity([1, 2, 3]); // OK
// loggingIdentity(3); // Error: number doesn't have a .length property
```

### Using Type Parameters in Generic Constraints
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // OK
getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'
```

### Generic Defaults
```typescript
interface GenericInterface<T = string> {
    value: T;
}

const stringValue: GenericInterface = { value: "hello" };
const numberValue: GenericInterface<number> = { value: 42 };
```

## Mastery Level

### Conditional Types
```typescript
type ExtractType<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type ExtractedType = ExtractType<StringArray>; // string
```

### Mapped Types with Generics
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface Person {
    name: string;
    age: number;
}

type ReadonlyPerson = Readonly<Person>;
type PartialPerson = Partial<Person>;
```

### Generic Type Aliases
```typescript
type Tree<T> = {
    value: T;
    left?: Tree<T>;
    right?: Tree<T>;
};

const numberTree: Tree<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
    },
    right: {
        value: 3
    }
};
```

## Best Practices

### Basic
- Use generics to create reusable components
- Leverage type inference when possible
- Keep generic type parameters simple and clear

### Advanced
- Use constraints to limit generic types
- Combine generics with interfaces for better type safety
- Use default types for common cases

### Mastery
- Create complex type transformations with conditional types
- Use mapped types to create utility types
- Implement recursive generic types for complex data structures 