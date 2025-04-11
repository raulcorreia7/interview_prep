# Functions in TypeScript

TypeScript enhances JavaScript functions by enabling type annotations for parameters and return values.

## Basic Function Declaration

```typescript
// Function with type annotations
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const greet = (name: string): string => `Hello, ${name}!`;
```

## Function Parameters

```typescript
// Optional parameters
function log(message: string, userId?: string): void {
  console.log(message, userId ?? 'Not signed in');
}

// Default parameters
function greet(name: string = 'Guest'): string {
  return `Hello, ${name}`;
}
```

## Basic Best Practices

1. **Type Safety**
   - Always specify parameter types
   - Always specify return types
   - Use type inference only when types are obvious
   - Avoid using `any` type

2. **Function Design**
   - Keep functions small and focused
   - Follow single responsibility principle
   - Use meaningful names
   - Limit the number of parameters

3. **Error Handling**
   - Use try/catch for async operations
   - Throw meaningful errors
   - Handle edge cases

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
