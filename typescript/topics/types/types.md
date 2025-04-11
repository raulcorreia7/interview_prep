# Types in TypeScript

## Basic Types [Core]

### Primitive Types [Core]
```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let undef: undefined = undefined;
let nul: null = null;
let sym: symbol = Symbol("key");
```

### Literal Types [Common]
```typescript
let direction: "north" | "south" | "east" | "west";
let status: 200 | 404 | 500;
```

## Object Types [Core]

### Interfaces [Core]
```typescript
interface User {
  name: string;
  age: number;
  email?: string;
  readonly id: number;
}
```

### Type Aliases [Common]
```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;
```

### Index Signatures [Common]
```typescript
interface StringArray {
  [index: number]: string;
}

interface Dictionary {
  [key: string]: number;
}
```

## Union and Intersection Types [Common]

### Union Types [Common]
```typescript
type Status = "success" | "error" | "loading";
type ID = string | number;
```

### Intersection Types [Common]
```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;
```

## Advanced Types [Advanced]

### Mapped Types [Advanced]
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### Conditional Types [Advanced]
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type ExtractType<T, U> = T extends U ? T : never;
```

## Utility Types [Common]

### Common Utility Types [Common]
```typescript
// Built-in utility types
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type PickUser = Pick<User, "name" | "age">;
type OmitUser = Omit<User, "email">;
```

### Custom Utility Types [Advanced]
```typescript
type Nullable<T> = T | null;
type Promisify<T> = Promise<T>;
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

## Best Practices [Core]

1. Use interfaces for object shapes
2. Use type aliases for unions and intersections
3. Prefer readonly for immutable properties
4. Use strict null checks
5. Avoid using any type
6. Use proper type guards [Common]
7. Consider using branded types [Advanced]
8. Use proper type inference
9. Document complex types
10. Use utility types when appropriate

## Common Patterns [Common]

### Type Guards [Common]
```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

### Discriminated Unions [Common]
```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "square": return shape.size * shape.size;
    case "circle": return Math.PI * shape.radius * shape.radius;
  }
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic type annotations
- Interface definitions
- Type aliases
- Union and intersection types
- Type inference

### Common Interview Questions [Common]
- What's the difference between type and interface?
- How do you handle nullable types in TypeScript?
- What are utility types and how do you use them?
- How do you implement type guards?

### Advanced Topics [Advanced]
- Mapped types
- Conditional types
- Branded types
- Advanced type inference

### Mastery Level [Mastery]
- Complex type manipulation
- Advanced generic types
- Type system internals
- Performance implications of complex types
