# Variables in TypeScript

TypeScript provides three primary ways to declare variables: `var`, `let`, and `const`.

## Basic Variable Declarations

```typescript
// var (avoid using)
var x = 10;

// let (for variables that change)
let y = 20;
y = 30; // Allowed

// const (for constants)
const z = 40;
// z = 50; // Error: Cannot assign to constant
```

## Type Annotations

```typescript
// Explicit type annotation
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;

// Type inference
const inferredString = 'Hello'; // TypeScript infers string
const inferredNumber = 42;      // TypeScript infers number
```

## Basic Best Practices

1. **Use `const` by default**
   - For values that won't change
   - Helps prevent accidental reassignments

2. **Use `let` when needed**
   - Only when variable needs to be reassigned
   - Prefer block scope over function scope

3. **Avoid `var`**
   - Can lead to unexpected behavior
   - Function scope can be confusing
   - No longer needed in modern TypeScript

4. **Basic Type Safety**
   - Use type annotations for clarity
   - Let TypeScript infer types when obvious
   - Avoid using `any` type

## Common Pitfalls

1. **Scope Issues**
```typescript
// Bad
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100); // Prints 5 five times
}

// Good
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100); // Prints 0,1,2,3,4
}
```

2. **Type Safety**
```typescript
// Bad
let data: any = fetchData();

// Good
let data: string = fetchData();
```
