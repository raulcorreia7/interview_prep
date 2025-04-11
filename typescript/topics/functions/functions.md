# Functions in TypeScript

TypeScript enhances JavaScript functions by enabling type annotations for parameters and return values.

## Function Declarations [Core]

### Basic Functions [Core]
```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const greetArrow = (name: string): string => {
  return `Hello, ${name}!`;
};
```

### Function Types [Core]
```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};
```

## Parameters [Core]

### Required Parameters [Core]
```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

### Optional Parameters [Common]
```typescript
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}!` : `Hello, ${name}!`;
}
```

### Default Parameters [Common]
```typescript
function greet(name: string, title: string = "Mr."): string {
  return `Hello, ${title} ${name}!`;
}
```

### Rest Parameters [Common]
```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
```

## Function Overloading [Advanced]

### Overload Signatures [Advanced]
```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

## Higher-Order Functions [Common]

### Function as Parameters [Common]
```typescript
function map<T, U>(array: T[], callback: (item: T) => U): U[] {
  return array.map(callback);
}
```

### Function as Return Values [Common]
```typescript
function createAdder(x: number): (y: number) => number {
  return (y: number) => x + y;
}
```

## Best Practices [Core]

1. Use explicit return types for public functions
2. Prefer arrow functions for callbacks
3. Use function overloading sparingly
4. Document complex function signatures
5. Use type aliases for complex function types
6. Consider using readonly parameters [Common]
7. Use proper parameter ordering [Common]
8. Handle optional parameters carefully
9. Use rest parameters for variable arguments
10. Consider using generics for reusable functions [Advanced]

## Common Patterns [Common]

### Callback Patterns [Common]
```typescript
function fetchData(callback: (data: string) => void): void {
  // Simulate async operation
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}
```

### Factory Functions [Common]
```typescript
function createUser(name: string, age: number) {
  return {
    name,
    age,
    greet() {
      return `Hello, ${this.name}!`;
    }
  };
}
```

### Currying [Advanced]
```typescript
function curry<T, U, V>(fn: (a: T, b: U) => V): (a: T) => (b: U) => V {
  return (a: T) => (b: U) => fn(a, b);
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Function declarations and expressions
- Parameter types and optional parameters
- Return type annotations
- Basic function types
- Arrow functions

### Common Interview Questions [Common]
- What's the difference between function declarations and arrow functions?
- How do you handle optional parameters in TypeScript?
- What are function types and how are they used?
- How do you implement function overloading?

### Advanced Topics [Advanced]
- Function overloading
- Higher-order functions
- Currying and partial application
- Generic functions

### Mastery Level [Mastery]
- Advanced type inference in functions
- Complex function composition
- Performance optimization in function calls
- Advanced generic function patterns

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
function process(data: any) {
  return data.value;
}

// Good
function process(data: { value: string }): string {
  return data.value;
}
```

2. **Parameter Validation**
```typescript
// Bad
function divide(a: number, b: number) {
  return a / b;
}

// Good
function divide(a: number, b: number) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
```
