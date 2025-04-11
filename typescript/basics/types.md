# Basic Types in TypeScript

TypeScript provides several basic types to help you write type-safe code.

## Primitive Types

```typescript
// String
let name: string = 'John';

// Number
let age: number = 30;

// Boolean
let isActive: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
```

## Type Annotations

```typescript
// Explicit type annotation
let message: string = 'Hello';

// Type inference
let count = 42; // TypeScript infers number
```

## Basic Best Practices

1. **Type Safety**
   - Use explicit types for clarity
   - Let TypeScript infer types when obvious
   - Avoid using `any` type

2. **Type Checking**
   - Use type guards for runtime checks
   - Validate input types
   - Handle edge cases

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
let data: any = getData();

// Good
let data: string = getData();
```

2. **Type Checking**
```typescript
// Bad
function process(value: unknown) {
  return value.length;
}

// Good
function process(value: unknown) {
  if (typeof value === 'string') {
    return value.length;
  }
  return 0;
}
```
