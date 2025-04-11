# TypeScript Type Assertions

Type assertions in TypeScript are a way to tell the compiler "trust me, I know what I'm doing" when you know more about the type of a value than TypeScript does.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [as Syntax](#as-syntax)
- [Angle Bracket Syntax](#angle-bracket-syntax)
- [Type Assertions vs Type Guards](#type-assertions-vs-type-guards)
- [Common Use Cases](#common-use-cases)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

## Basic Syntax

There are two ways to perform type assertions in TypeScript:

### 1. as Syntax (Preferred)
```typescript
const value: unknown = "hello";
const str = value as string;
```

### 2. Angle Bracket Syntax
```typescript
const value: unknown = "hello";
const str = <string>value;
```

## as Syntax

The `as` syntax is the preferred way to perform type assertions in modern TypeScript:

```typescript
// Basic usage
const element = document.getElementById('my-element') as HTMLInputElement;

// With union types
const value: string | number = "123";
const num = value as number;

// With any
const data: any = { name: "John" };
const user = data as User;
```

## Angle Bracket Syntax

The angle bracket syntax is an older style that is still supported:

```typescript
// Basic usage
const element = <HTMLInputElement>document.getElementById('my-element');

// With union types
const value: string | number = "123";
const num = <number>value;

// With any
const data: any = { name: "John" };
const user = <User>data;
```

## Type Assertions vs Type Guards

### Type Assertions
- Tell the compiler to treat a value as a specific type
- No runtime checking
- Can lead to runtime errors if used incorrectly

```typescript
const value: unknown = "hello";
const str = value as string; // No runtime check
```

### Type Guards
- Perform runtime checks
- Provide type safety
- Preferred over type assertions when possible

```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

const value: unknown = "hello";
if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.length);
}
```

## Common Use Cases

### 1. DOM Manipulation
```typescript
// Without type assertion
const element = document.getElementById('my-input');
element.value = 'hello'; // Error: value might be null

// With type assertion
const input = document.getElementById('my-input') as HTMLInputElement;
input.value = 'hello'; // No error
```

### 2. Working with API Responses
```typescript
interface User {
    id: number;
    name: string;
}

async function fetchUser(): Promise<User> {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data as User;
}
```

### 3. Type Narrowing
```typescript
function processValue(value: string | number) {
    if (typeof value === 'string') {
        // Type assertion to number
        const num = value as unknown as number;
        console.log(num.toFixed(2));
    }
}
```

### 4. Working with Third-Party Libraries
```typescript
// When a library doesn't have proper type definitions
const result = (window as any).someLibraryFunction() as MyType;
```

## Best Practices

1. Use type assertions sparingly
   - Prefer type guards when possible
   - Only use when you're certain about the type
   - Document why the assertion is necessary

2. Use the `as` syntax
   - More readable
   - Less likely to conflict with JSX
   - Modern TypeScript standard

3. Double assertions when necessary
```typescript
// When you need to assert through an intermediate type
const value = "123" as unknown as number;
```

4. Use type assertions with unknown
```typescript
// Better than using any
const data: unknown = JSON.parse(jsonString);
const user = data as User;
```

## Common Pitfalls

1. Incorrect Assertions
```typescript
// ❌ Don't do this
const value = "123" as number;
value.toFixed(2); // Runtime error!
```

2. Overusing Assertions
```typescript
// ❌ Don't use assertions when type guards would work
function getLength(value: string | number) {
    return (value as string).length; // Unsafe!
}

// ✅ Do this instead
function getLength(value: string | number) {
    if (typeof value === 'string') {
        return value.length;
    }
    return value.toString().length;
}
```

3. Asserting to any
```typescript
// ❌ Avoid asserting to any
const data = response as any;

// ✅ Use unknown instead
const data = response as unknown as MyType;
```

4. Ignoring Null Checks
```typescript
// ❌ Don't ignore potential null values
const element = document.getElementById('my-element') as HTMLInputElement;

// ✅ Check for null first
const element = document.getElementById('my-element');
if (element) {
    const input = element as HTMLInputElement;
    // Use input safely
}
```

## Advanced Patterns

### 1. Const Assertions
```typescript
// Without const assertion
const config = {
    host: 'localhost',
    port: 3000
}; // Type is { host: string; port: number; }

// With const assertion
const config = {
    host: 'localhost',
    port: 3000
} as const; // Type is { readonly host: "localhost"; readonly port: 3000; }
```

### 2. Non-null Assertion Operator
```typescript
// Without non-null assertion
function processElement(element: HTMLElement | null) {
    if (element) {
        element.classList.add('active');
    }
}

// With non-null assertion
function processElement(element: HTMLElement | null) {
    element!.classList.add('active'); // Use with caution!
}
```

### 3. Type Assertion Functions
```typescript
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value is not a string');
    }
}

function process(value: unknown) {
    assertIsString(value);
    // TypeScript knows value is string here
    console.log(value.length);
}
``` 