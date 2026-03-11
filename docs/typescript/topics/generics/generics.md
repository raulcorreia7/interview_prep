# TypeScript Generics

## Basic Generics [Core]

### Generic Functions

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let output2 = identity("hello"); // type inference
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

## Generic Constraints [Common]

### Using Type Parameters

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
getProperty(x, "m"); // error
```

### Generic Classes

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

## Advanced Generics [Advanced]

### Generic Type Aliases

```typescript
type Container<T> = { value: T };

type Tree<T> = {
  value: T;
  left: Tree<T> | null;
  right: Tree<T> | null;
};
```

### Generic Defaults

```typescript
interface A<T = string> {
  name: T;
}

const a: A = { name: "hello" }; // T is string
const b: A<number> = { name: 123 }; // T is number
```

## Generic Patterns [Mastery]

### Mapped Types with Generics

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Conditional Types with Generics

```typescript
type ExtractType<T> = T extends (infer U)[] ? U : never;
type NonNullable<T> = T extends null | undefined ? never : T;

type ArrayType = ExtractType<string[]>; // string
type NonNullString = NonNullable<string | null>; // string
```

## Interview Focus Areas

### Core Knowledge

- Basic generic functions
- Generic interfaces
- Type inference with generics
- Generic constraints

### Common Interview Questions

- What are generics and why use them?
- How do generic constraints work?
- How does type inference work with generics?
- What are generic classes?

### Advanced Topics

- Generic type aliases
- Generic defaults
- Mapped types with generics
- Conditional types with generics

### Mastery Level

- Complex generic patterns
- Advanced type manipulation
- Generic type system design
- Performance considerations
