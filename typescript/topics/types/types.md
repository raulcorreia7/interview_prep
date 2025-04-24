# TypeScript Types

## Basic Types [Core]

### Primitive Types

```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let undef: undefined = undefined;
let nul: null = null;
```

### Literal Types

```typescript
type Direction = "north" | "south" | "east" | "west";
type Status = 200 | 404 | 500;

function move(direction: Direction): void {
  // ...
}

function handleStatus(status: Status): void {
  // ...
}
```

## Advanced Types [Advanced]

### Union Types

```typescript
type ID = string | number;
type Status = "success" | "error" | "loading";

function processID(id: ID): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

### Intersection Types

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30,
};
```

## Type System Patterns [Advanced]

### Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

### Type Predicates

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
```

## Utility Types [Mastery]

### Built-in Utility Types

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### Custom Utility Types

```typescript
type Nullable<T> = T | null;
type NonNullable<T> = T extends null | undefined ? never : T;

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## Related Topics

- [Variables](./../variables/variables.md)
- [Type System](./../type-system/type-system.md)
- [Interfaces](./../interfaces/interfaces.md)
- [Type Features](./../type-features/type-features.md)

## Interview Focus Areas

### Core Knowledge

- Basic types
- Literal types
- Type annotations
- Type inference

### Common Interview Questions

- What are the basic types in TypeScript?
- How do literal types work?
- What's the difference between type and interface?
- How does type inference work?

### Advanced Topics

- Union types
- Intersection types
- Type guards
- Type predicates

### Mastery Level

- Utility types
- Custom type manipulation
- Advanced type patterns
- Type system design
