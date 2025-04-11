# TypeScript Type Inference

Type inference is TypeScript's ability to automatically determine the type of a value without explicit type annotations. It's one of TypeScript's most powerful features, allowing for both type safety and concise code.

## Table of Contents
- [Basic Inference](#basic-inference)
- [Contextual Typing](#contextual-typing)
- [Best Common Type](#best-common-type)
- [Type Widening](#type-widening)
- [Type Narrowing](#type-narrowing)
- [Control Flow Analysis](#control-flow-analysis)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

## Basic Inference

TypeScript can infer types in various situations:

### Variable Declarations
```typescript
let x = 3;        // TypeScript infers x is number
let y = "hello";  // TypeScript infers y is string
let z = true;     // TypeScript infers z is boolean
```

### Function Return Types
```typescript
function add(a: number, b: number) {
    return a + b;  // TypeScript infers return type is number
}
```

### Object Literals
```typescript
const person = {
    name: "John",
    age: 30
};  // TypeScript infers { name: string; age: number; }
```

## Contextual Typing

TypeScript uses the context in which a value appears to infer its type:

### Function Parameters
```typescript
const names = ["Alice", "Bob", "Charlie"];
names.forEach(name => {
    console.log(name.toUpperCase());  // TypeScript knows name is string
});
```

### Event Handlers
```typescript
window.onclick = function(event) {
    console.log(event.clientX);  // TypeScript knows event is MouseEvent
};
```

## Best Common Type

When multiple types are possible, TypeScript uses the best common type:

```typescript
const values = [0, 1, null];  // TypeScript infers (number | null)[]
const mixed = [1, "two", true];  // TypeScript infers (number | string | boolean)[]
```

## Type Widening

TypeScript widens types in certain situations:

```typescript
let x = "hello";  // Type is string
x = "world";      // Allowed
x = 123;          // Error: Type 'number' is not assignable to type 'string'

const y = "hello";  // Type is "hello" (literal type)
```

## Type Narrowing

TypeScript narrows types based on control flow:

### typeof Guards
```typescript
function process(value: string | number) {
    if (typeof value === "string") {
        // TypeScript knows value is string here
        return value.toUpperCase();
    }
    // TypeScript knows value is number here
    return value.toFixed(2);
}
```

### instanceof Checks
```typescript
class Animal {}
class Dog extends Animal {
    bark() {}
}

function makeSound(animal: Animal) {
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog here
        animal.bark();
    }
}
```

## Control Flow Analysis

TypeScript analyzes control flow to narrow types:

```typescript
function processValue(value: string | null) {
    if (value === null) {
        return;  // TypeScript knows value is null here
    }
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
}
```

## Best Practices

1. Let TypeScript infer types when possible
```typescript
// ✅ Good
const name = "John";
const age = 30;

// ❌ Unnecessary
const name: string = "John";
const age: number = 30;
```

2. Use explicit types for function parameters
```typescript
// ✅ Good
function greet(name: string) {
    return `Hello, ${name}!`;
}

// ❌ Bad
function greet(name) {
    return `Hello, ${name}!`;
}
```

3. Use type annotations for complex return types
```typescript
// ✅ Good
function getUser(): { name: string; age: number } {
    return { name: "John", age: 30 };
}

// ❌ Less clear
function getUser() {
    return { name: "John", age: 30 };
}
```

4. Use const assertions for literal types
```typescript
// ✅ Good
const config = {
    host: "localhost",
    port: 3000
} as const;

// ❌ Type is widened
const config = {
    host: "localhost",
    port: 3000
};
```

## Common Pitfalls

1. Overusing explicit types
```typescript
// ❌ Unnecessary type annotation
const name: string = "John";

// ✅ Let TypeScript infer
const name = "John";
```

2. Ignoring inference in function returns
```typescript
// ❌ Unnecessary return type
function add(a: number, b: number): number {
    return a + b;
}

// ✅ Let TypeScript infer
function add(a: number, b: number) {
    return a + b;
}
```

3. Not using type narrowing
```typescript
// ❌ Missed opportunity for type narrowing
function process(value: string | null) {
    return value?.toUpperCase();
}

// ✅ Better with type narrowing
function process(value: string | null) {
    if (value === null) {
        return null;
    }
    return value.toUpperCase();
}
```

4. Ignoring contextual typing
```typescript
// ❌ Missing type information
const names = ["Alice", "Bob"];
names.forEach(n => {
    console.log(n);  // n is any
});

// ✅ Better with contextual typing
const names = ["Alice", "Bob"];
names.forEach((n: string) => {
    console.log(n);  // n is string
});
```

## Advanced Patterns

### 1. Discriminated Unions
```typescript
type Success = {
    type: "success";
    data: string;
};

type Error = {
    type: "error";
    message: string;
};

type Result = Success | Error;

function process(result: Result) {
    if (result.type === "success") {
        // TypeScript knows result is Success
        console.log(result.data);
    } else {
        // TypeScript knows result is Error
        console.log(result.message);
    }
}
```

### 2. User-Defined Type Guards
```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function process(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string
        console.log(value.toUpperCase());
    }
}
```

### 3. Assertion Functions
```typescript
function assert(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

function process(value: unknown) {
    assert(typeof value === "string", "Value must be a string");
    // TypeScript knows value is string
    console.log(value.toUpperCase());
}
```

### 4. Const Context
```typescript
// Without const context
const config = {
    host: "localhost",
    port: 3000
};  // Type is { host: string; port: number; }

// With const context
const config = {
    host: "localhost",
    port: 3000
} as const;  // Type is { readonly host: "localhost"; readonly port: 3000; }
``` 