# Type System in TypeScript

## Basic Types [Core]

### Primitive Types [Core]
```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let undef: undefined = undefined;
let nul: null = null;
```

### Type Annotations [Core]
```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const age: number = 30;
```

## Type Inference [Core]

### Basic Inference [Core]
```typescript
let x = 10;        // TypeScript infers number
let y = "hello";   // TypeScript infers string
```

### Contextual Typing [Common]
```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  // TypeScript knows this is a MouseEvent
};
```

## Advanced Types [Advanced]

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

## Type Guards [Common]

### Type Predicates [Common]
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

## Best Practices [Core]

1. Use explicit types for public APIs
2. Let TypeScript infer types when obvious
3. Use proper type guards
4. Avoid using any type
5. Use proper type annotations
6. Consider using type aliases [Common]
7. Use proper type constraints [Common]
8. Document complex types
9. Use proper type inference
10. Consider using utility types [Advanced]

## Common Patterns [Common]

### Type Aliases [Common]
```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;
```

### Utility Types [Common]
```typescript
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type PickUser = Pick<User, "name" | "age">;
type OmitUser = Omit<User, "email">;
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic type annotations
- Type inference
- Primitive types
- Basic type guards
- Type compatibility

### Common Interview Questions [Common]
- What's the difference between type and interface?
- How does type inference work in TypeScript?
- What are type guards and how do you use them?
- How do you handle nullable types?

### Advanced Topics [Advanced]
- Union and intersection types
- Discriminated unions
- Mapped types
- Conditional types

### Mastery Level [Mastery]
- Advanced type manipulation
- Type system internals
- Performance implications
- Complex type patterns 