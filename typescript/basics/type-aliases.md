# TypeScript Type Aliases

Type aliases in TypeScript allow you to create a new name for a type. They can be used to create custom types, simplify complex type definitions, and improve code readability.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Primitive Types](#primitive-types)
- [Object Types](#object-types)
- [Union Types](#union-types)
- [Intersection Types](#intersection-types)
- [Generic Types](#generic-types)
- [Type Aliases vs Interfaces](#type-aliases-vs-interfaces)
- [Best Practices](#best-practices)

## Basic Syntax

```typescript
type Name = string;
type Age = number;
type IsActive = boolean;
```

## Primitive Types

You can create aliases for primitive types:

```typescript
type UserID = string;
type Timestamp = number;
type Status = 'active' | 'inactive' | 'pending';
```

## Object Types

Type aliases can be used to define object types:

```typescript
type User = {
    id: UserID;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
};
```

## Union Types

Type aliases are particularly useful for union types:

```typescript
type Result = Success | Error;

type Success = {
    status: 'success';
    data: any;
};

type Error = {
    status: 'error';
    message: string;
};
```

## Intersection Types

You can combine multiple types using intersection:

```typescript
type Employee = {
    id: string;
    name: string;
};

type Manager = {
    department: string;
    teamSize: number;
};

type ManagerEmployee = Employee & Manager;
```

## Generic Types

Type aliases can be generic:

```typescript
type Response<T> = {
    data: T;
    status: number;
    message: string;
};

type UserResponse = Response<User>;
type ProductResponse = Response<Product>;
```

## Type Aliases vs Interfaces

### Similarities
- Both can be used to describe object shapes
- Both can be extended
- Both can be implemented by classes

### Differences
- Interfaces can be reopened to add new properties
- Type aliases can represent union types
- Type aliases can represent primitive types
- Type aliases can use computed properties

### Example Comparison
```typescript
// Interface
interface Point {
    x: number;
    y: number;
}

// Type Alias
type Point = {
    x: number;
    y: number;
}
```

## Best Practices

1. Use type aliases for:
   - Union types
   - Intersection types
   - Complex type definitions
   - Primitive type aliases
   - Generic types

2. Use interfaces for:
   - Object shapes that might be extended
   - Class implementations
   - Declaration merging

3. Naming conventions:
   - Use PascalCase for type aliases
   - Be descriptive in naming
   - Avoid generic names like `Type` or `Data`

4. Organization:
   - Group related types together
   - Use type aliases to reduce repetition
   - Consider using separate files for complex type definitions

## Common Use Cases

### 1. API Response Types
```typescript
type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: number;
};
```

### 2. State Management
```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type State<T> = {
    data: T | null;
    loading: LoadingState;
    error: string | null;
};
```

### 3. Event Handling
```typescript
type MouseEvent = {
    type: 'click' | 'hover' | 'drag';
    x: number;
    y: number;
    timestamp: number;
};
```

## Advanced Patterns

### 1. Mapped Types with Type Aliases
```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};
```

### 2. Conditional Types
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type ExtractType<T> = T extends (infer U)[] ? U : T;
```

### 3. Recursive Types
```typescript
type TreeNode<T> = {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
};
```

## Common Pitfalls

1. Circular References
```typescript
// ❌ Don't do this
type A = {
    b: B;
}

type B = {
    a: A;
}
```

2. Overusing Type Aliases
```typescript
// ❌ Don't create aliases for simple types
type String = string;
type Number = number;
```

3. Inconsistent Naming
```typescript
// ❌ Avoid inconsistent naming
type user = { name: string };  // lowercase
type Product = { name: string }; // PascalCase
```

4. Overly Complex Types
```typescript
// ❌ Avoid overly complex single-line types
type ComplexType = { [K in keyof T]: T[K] extends U ? V : W } & { [P in Q]?: R };
``` 