# TypeScript Types

This document covers TypeScript types across three levels of expertise: Basic, Advanced, and Mastery.

## Table of Contents
- [Basic Level](#basic-level)
- [Advanced Level](#advanced-level)
- [Mastery Level](#mastery-level)

## Basic Level

### Primitive Types
```typescript
// Basic type declarations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Type Annotations
```typescript
// Function parameter and return type annotations
function greet(name: string): string {
    return `Hello, ${name}!`;
}
```

### Type Inference
```typescript
// TypeScript can infer types
let inferredString = "Hello";  // TypeScript infers string
let inferredNumber = 42;       // TypeScript infers number
```

## Advanced Level

### Union Types
```typescript
// A variable that can be one of several types
let id: string | number;
id = "123";    // Valid
id = 123;      // Valid
```

### Intersection Types
```typescript
// Combining multiple types into one
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;

const person: Person = {
    name: "John",
    age: 30
};
```

### Literal Types
```typescript
// Specific string or number values
type Direction = "north" | "south" | "east" | "west";
let direction: Direction = "north";  // Only these four values are valid
```

## Mastery Level

### Conditional Types
```typescript
// Types that depend on other types
type ExtractType<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type ExtractedType = ExtractType<StringArray>;  // string
```

### Mapped Types
```typescript
// Creating new types by transforming existing ones
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface Person {
    name: string;
    age: number;
}

type ReadonlyPerson = Readonly<Person>;
```

### Template Literal Types
```typescript
// Manipulating string literal types
type EventName = "click" | "hover" | "scroll";
type HandlerName = `on${Capitalize<EventName>}`;  // "onClick" | "onHover" | "onScroll"
```

## Exercises

### Basic
1. Create a function that takes a string and returns its length
2. Create an interface for a basic user with name and email

### Advanced
1. Create a type that can be either a string or an array of strings
2. Create an intersection type combining two interfaces

### Mastery
1. Create a mapped type that makes all properties optional and nullable
2. Create a conditional type that extracts the return type of a function

## Best Practices

### Basic
- Always use type annotations for function parameters and return types
- Leverage type inference for simple variable declarations

### Advanced
- Use union types to handle multiple possible types
- Use intersection types to combine multiple interfaces

### Mastery
- Use conditional types for complex type transformations
- Leverage mapped types for creating utility types
- Use template literal types for string manipulation 