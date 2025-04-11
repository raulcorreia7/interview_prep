# Basic Interfaces in TypeScript

Interfaces in TypeScript define the structure of objects and provide type checking.

## Basic Interface Declaration

```typescript
// Simple interface
interface User {
  name: string;
  age: number;
}

// Using the interface
const user: User = {
  name: 'John',
  age: 30
};
```

## Optional Properties

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

const user: User = {
  name: 'John',
  age: 30
  // email is optional
};
```

## Basic Best Practices

1. **Interface Design**
   - Use clear, descriptive names
   - Keep interfaces focused
   - Use proper documentation
   - Group related properties

2. **Type Safety**
   - Define all required properties
   - Use proper types for properties
   - Avoid using `any` type
   - Use optional properties when needed

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
interface User {
  data: any;
}

// Good
interface User {
  name: string;
  age: number;
}
```

2. **Property Validation**
```typescript
// Bad
interface User {
  age: number;
}

// Good
interface User {
  age: number;
}

function validateUser(user: User): boolean {
  return user.age >= 0;
}
```
