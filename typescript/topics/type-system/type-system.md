# TypeScript Type System

## Type Inference [Core]

### Basic Inference
```typescript
let x = 3; // x is inferred as number
let y = "hello"; // y is inferred as string
```

### Contextual Typing
```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button); // OK
  console.log(mouseEvent.kangaroo); // Error
};
```

## Type Guards [Common]

### Type Predicates
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // value is string here
    console.log(value.toUpperCase());
  }
}
```

### Discriminated Unions
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

function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.width * s.height;
  }
}
```

## Type Compatibility [Advanced]

### Structural Typing
```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26, z: 89 };
logPoint(point); // OK, extra properties allowed
```

### Excess Property Checks
```typescript
interface Point {
  x: number;
  y: number;
}

function createPoint(point: Point): Point {
  return point;
}

// Error: Object literal may only specify known properties
createPoint({ x: 1, y: 2, z: 3 });
```

## Type System Design [Mastery]

### Type Operations
```typescript
type Nullable<T> = T | null;
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
```

### Advanced Type Patterns
```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## Interview Focus Areas

### Core Knowledge
- Type inference
- Basic type guards
- Type compatibility
- Structural typing

### Common Interview Questions
- How does TypeScript handle type inference?
- What are type guards and how do you use them?
- How does structural typing work?
- What are excess property checks?

### Advanced Topics
- Advanced type guards
- Type compatibility rules
- Type operations
- Type system design

### Mastery Level
- Complex type patterns
- Advanced type operations
- Type system design
- Performance considerations 