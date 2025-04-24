# Variables in TypeScript

## Variable Declarations [Core]

### var, let, const

```typescript
var x = 10; // Function-scoped
let y = 20; // Block-scoped
const z = 30; // Block-scoped, immutable reference
```

### Type Annotations

```typescript
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
```

## Variable Types [Core]

### Primitive Types

```typescript
// Basic types
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let undef: undefined = undefined;
let nul: null = null;
```

### Complex Types [Common]

```typescript
// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Tuples
let person: [string, number] = ["John", 30];

// Objects
let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};
```

## Type Inference [Core]

### Basic Inference

```typescript
let x = 10; // TypeScript infers number
let y = "hello"; // TypeScript infers string
```

### Contextual Typing [Common]

```typescript
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button); // TypeScript knows this is a MouseEvent
};
```

## Variable Scope [Core]

### Block Scope

```typescript
function example() {
  if (true) {
    let x = 10; // Only accessible within if block
    var y = 20; // Accessible in entire function
  }
  console.log(y); // Works
  console.log(x); // Error: x is not defined
}
```

### Function Scope

```typescript
function example() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable!
  }
  console.log(x); // 20
}
```

## Best Practices [Core]

1. Prefer const over let when possible
2. Use let for variables that need to be reassigned
3. Avoid using var
4. Always specify types for function parameters
5. Use type inference for simple variable declarations
6. Use explicit types for complex objects [Common]
7. Consider using type aliases for complex types [Common]
8. Use readonly for immutable properties [Common]
9. Consider using const assertions [Advanced]
10. Use proper naming conventions

## Common Patterns [Common]

### Type Aliases

```typescript
type Point = {
  x: number;
  y: number;
};

let p: Point = { x: 10, y: 20 };
```

### Const Assertions [Advanced]

```typescript
const point = { x: 10, y: 20 } as const;
// point.x = 30; // Error: Cannot assign to 'x' because it is a read-only property
```

### Readonly Properties [Common]

```typescript
interface User {
  readonly id: number;
  name: string;
}

let user: User = { id: 1, name: "John" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
```

## Related Topics

- [Types](./../types/types.md)
- [Type System](./../type-system/type-system.md)
- [Interfaces](./../interfaces/interfaces.md)
- [Functions](./../functions/functions.md)

## Interview Focus Areas

### Core Knowledge

- Difference between var, let, and const
- Basic type annotations
- Type inference
- Variable scoping rules
- Primitive types

### Common Interview Questions

- What's the difference between let and const?
- When would you use type annotations vs. type inference?
- How does variable hoisting work in TypeScript?
- What are the different ways to declare variables in TypeScript?

### Advanced Topics

- Const assertions
- Type narrowing
- Discriminated unions
- Advanced type inference patterns

### Mastery Level

- Complex type inference scenarios
- Advanced type manipulation
- Performance implications of type annotations
- Compiler optimization techniques
