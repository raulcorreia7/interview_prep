# TypeScript Guards

Type guards are a powerful TypeScript feature that allows you to narrow down the type of a variable
within a conditional block. They help TypeScript understand the specific type of a value at runtime.

## Table of Contents

- [TypeScript Guards](#typescript-guards)
  - [Table of Contents](#table-of-contents)
  - [Type Guards](#type-guards)
    - [Basic Example](#basic-example)
  - [User-Defined Type Guards](#user-defined-type-guards)
    - [Example](#example)
  - [Type Predicates](#type-predicates)
    - [Syntax](#syntax)
  - [Built-in Type Guards](#built-in-type-guards)
    - [typeof](#typeof)
    - [instanceof](#instanceof)
    - [in](#in)
  - [Discriminated Unions](#discriminated-unions)
    - [Example](#example-1)
  - [Practical Examples](#practical-examples)
    - [1. Null Checking](#1-null-checking)
    - [2. Array Type Guard](#2-array-type-guard)
    - [3. Custom Type Guard with Complex Logic](#3-custom-type-guard-with-complex-logic)
  - [Best Practices](#best-practices)
  - [Common Pitfalls](#common-pitfalls)

## Type Guards

Type guards are expressions that perform runtime checks to guarantee the type in a scope.

### Basic Example

```typescript
function printLength(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.length);
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}
```

## User-Defined Type Guards

You can create your own type guards using functions that return a type predicate.

### Example

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

## Type Predicates

Type predicates are special return types that tell TypeScript that a value is of a specific type.

### Syntax

```typescript
function isType(value: any): value is Type {
  // type checking logic
  return true / false;
}
```

## Built-in Type Guards

TypeScript provides several built-in type guards:

### typeof

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // value is string
  } else {
    // value is number
  }
}
```

### instanceof

```typescript
class Animal {}
class Dog extends Animal {
  bark() {}
}

function makeSound(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark();
  }
}
```

### in

```typescript
interface A {
  x: number;
}

interface B {
  y: string;
}

function process(obj: A | B) {
  if ("x" in obj) {
    // obj is A
    console.log(obj.x);
  } else {
    // obj is B
    console.log(obj.y);
  }
}
```

## Discriminated Unions

Discriminated unions (also known as tagged unions) are a pattern that uses a common property to
distinguish between different types.

### Example

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

## Practical Examples

### 1. Null Checking

```typescript
function processValue(value: string | null) {
  if (value !== null) {
    // value is string
    console.log(value.toUpperCase());
  }
}
```

### 2. Array Type Guard

```typescript
function isStringArray(value: any): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function processArray(value: any) {
  if (isStringArray(value)) {
    // value is string[]
    value.forEach((str) => console.log(str.toUpperCase()));
  }
}
```

### 3. Custom Type Guard with Complex Logic

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function isValidUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    (value.email === undefined || typeof value.email === "string")
  );
}
```

## Best Practices

1. Use type guards to narrow types as early as possible
2. Prefer discriminated unions for complex type hierarchies
3. Keep type guard functions pure and simple
4. Use built-in type guards when possible
5. Document complex type guards with comments
6. Consider using type predicates for reusable type guards

## Common Pitfalls

1. Forgetting to handle all cases in discriminated unions
2. Overcomplicating type guard logic
3. Not properly checking for null/undefined
4. Using type assertions instead of proper type guards
5. Creating type guards that are too specific or too broad
