# TypeScript Conditional Types

Conditional types in TypeScript allow you to create types that depend on other types. They are a powerful feature that enables complex type transformations and type inference.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Type Inference](#type-inference)
- [Distributive Conditional Types](#distributive-conditional-types)
- [Type Constraints](#type-constraints)
- [Type Inference with Conditional Types](#type-inference-with-conditional-types)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

## Basic Syntax

### Basic Conditional Type
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
```

### Nested Conditional Types
```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
```

## Type Inference

### Infer Keyword
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): { name: string; age: number } {
    return { name: "John", age: 30 };
}

type User = ReturnType<typeof getUser>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### Multiple Type Parameters
```typescript
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

function greet(name: string, age: number): void {
    console.log(`Hello ${name}, you are ${age} years old`);
}

type Name = FirstParameter<typeof greet>; // string
```

## Distributive Conditional Types

### Union Types
```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Equivalent to:
// string[] | number[]
```

### Non-Distributive Types
```typescript
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray = ToArrayNonDist<string | number>;
// Equivalent to:
// (string | number)[]
```

## Type Constraints

### Extends Keyword
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null>;    // string
type B = NonNullable<string | undefined>; // string
```

### Multiple Constraints
```typescript
type ExtractType<T> = T extends { type: infer U } ? U : never;

interface User {
    type: "user";
    name: string;
}

interface Admin {
    type: "admin";
    name: string;
    role: string;
}

type UserType = ExtractType<User | Admin>; // "user" | "admin"
```

## Type Inference with Conditional Types

### Function Parameters
```typescript
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function greet(name: string, age: number): void {
    console.log(`Hello ${name}, you are ${age} years old`);
}

type GreetParams = Parameters<typeof greet>; // [string, number]
```

### Array Types
```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type StrArray = string[];
type Str = ElementType<StrArray>; // string
```

## Best Practices

1. Use conditional types for type transformations
```typescript
// ✅ Good
type NonNullable<T> = T extends null | undefined ? never : T;

// ❌ Bad
type NonNullable<T> = T;
```

2. Use infer for type extraction
```typescript
// ✅ Good
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// ❌ Bad
type ReturnType<T> = any;
```

3. Consider distributive behavior
```typescript
// ✅ Good
type ToArray<T> = T extends any ? T[] : never;

// ❌ Bad
type ToArray<T> = T[];
```

4. Use type constraints
```typescript
// ✅ Good
type ExtractType<T> = T extends { type: infer U } ? U : never;

// ❌ Bad
type ExtractType<T> = T["type"];
```

## Common Pitfalls

1. Forgetting about distributive behavior
```typescript
// ❌ Bad
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]

// ✅ Good
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result = ToArrayNonDist<string | number>; // (string | number)[]
```

2. Overusing conditional types
```typescript
// ❌ Bad
type ComplexType<T> = T extends string ? 
    (T extends "a" ? "A" : "B") : 
    (T extends number ? "N" : "O");

// ✅ Better
type SimpleType<T> = T extends string ? "S" : "O";
```

3. Not handling edge cases
```typescript
// ❌ Bad
type ExtractType<T> = T extends { type: string } ? T["type"] : never;

// ✅ Good
type ExtractType<T> = T extends { type: infer U } ? U : never;
```

4. Ignoring type inference
```typescript
// ❌ Bad
type ReturnType<T> = any;

// ✅ Good
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## Advanced Patterns

### 1. Recursive Conditional Types
```typescript
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface User {
    name: string;
    address: {
        street: string;
        city: string;
    };
}

type ReadonlyUser = DeepReadonly<User>;
```

### 2. Type Inference with Generics
```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

async function fetchUser(): Promise<{ name: string }> {
    return { name: "John" };
}

type User = UnwrapPromise<ReturnType<typeof fetchUser>>;
```

### 3. Conditional Type Constraints
```typescript
type ExtractPropertyType<T, K extends keyof T> = T extends { [P in K]: infer U } ? U : never;

interface User {
    name: string;
    age: number;
}

type NameType = ExtractPropertyType<User, "name">; // string
```

### 4. Type Guard with Conditional Types
```typescript
type TypeGuard<T> = (value: unknown) => value is T;

function isString(value: unknown): value is string {
    return typeof value === "string";
}

const stringGuard: TypeGuard<string> = isString;
```

### 5. Conditional Type Mapping
```typescript
type MapType<T> = {
    [P in keyof T]: T[P] extends string ? number :
                   T[P] extends number ? string :
                   T[P];
};

interface User {
    name: string;
    age: number;
    active: boolean;
}

type MappedUser = MapType<User>;
// Equivalent to:
// {
//     name: number;
//     age: string;
//     active: boolean;
// }
```

### 6. Type Inference with Function Overloads
```typescript
type OverloadedReturnType<T> = 
    T extends {
        (...args: any[]): infer R1;
        (...args: any[]): infer R2;
        (...args: any[]): infer R3;
    } ? R1 | R2 | R3 :
    T extends (...args: any[]) => infer R ? R : never;
```

### 7. Conditional Type with Default
```typescript
type WithDefault<T, D> = T extends undefined ? D : T;

function getUser(id?: string): WithDefault<typeof id, "default"> {
    return id ?? "default";
}
``` 