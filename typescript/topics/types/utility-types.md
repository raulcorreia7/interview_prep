# TypeScript Utility Types

Utility types are built-in generic types that help transform existing types into new types. They are powerful tools for type manipulation in TypeScript.

## Table of Contents
- [Basic Utility Types](#basic-utility-types)
- [Type Transformation](#type-transformation)
- [Type Modifiers](#type-modifiers)
- [Type Extraction](#type-extraction)
- [Type Composition](#type-composition)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

## Basic Utility Types

### Partial<T>
Makes all properties of T optional:
```typescript
interface User {
    name: string;
    age: number;
}

type PartialUser = Partial<User>;
// Equivalent to:
// {
//     name?: string;
//     age?: number;
// }
```

### Required<T>
Makes all properties of T required:
```typescript
interface User {
    name?: string;
    age?: number;
}

type RequiredUser = Required<User>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### Readonly<T>
Makes all properties of T readonly:
```typescript
interface User {
    name: string;
    age: number;
}

type ReadonlyUser = Readonly<User>;
// Equivalent to:
// {
//     readonly name: string;
//     readonly age: number;
// }
```

### Record<K, T>
Creates a type with keys K and values T:
```typescript
type UserRoles = Record<string, boolean>;
// Equivalent to:
// {
//     [key: string]: boolean;
// }
```

## Type Transformation

### Pick<T, K>
Picks a set of properties from T:
```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserBasicInfo = Pick<User, 'name' | 'age'>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### Omit<T, K>
Omits a set of properties from T:
```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserWithoutEmail = Omit<User, 'email'>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### Exclude<T, U>
Excludes types from T that are assignable to U:
```typescript
type T = 'a' | 'b' | 'c';
type U = 'a' | 'b';
type Result = Exclude<T, U>; // 'c'
```

### Extract<T, U>
Extracts types from T that are assignable to U:
```typescript
type T = 'a' | 'b' | 'c';
type U = 'a' | 'b';
type Result = Extract<T, U>; // 'a' | 'b'
```

## Type Modifiers

### NonNullable<T>
Excludes null and undefined from T:
```typescript
type T = string | null | undefined;
type Result = NonNullable<T>; // string
```

### ReturnType<T>
Gets the return type of a function type:
```typescript
function getUser(): { name: string; age: number } {
    return { name: 'John', age: 30 };
}

type User = ReturnType<typeof getUser>;
// Equivalent to:
// {
//     name: string;
//     age: number;
// }
```

### Parameters<T>
Gets the parameters of a function type:
```typescript
function greet(name: string, age: number): void {
    console.log(`Hello ${name}, you are ${age} years old`);
}

type GreetParams = Parameters<typeof greet>;
// Equivalent to:
// [string, number]
```

## Type Extraction

### InstanceType<T>
Gets the instance type of a constructor function:
```typescript
class User {
    constructor(public name: string, public age: number) {}
}

type UserInstance = InstanceType<typeof User>;
// Equivalent to:
// User
```

### ThisType<T>
Marks the type of this in a function:
```typescript
interface User {
    name: string;
    greet(): void;
}

const user: User & ThisType<User> = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);
    }
};
```

## Type Composition

### Combining Utility Types
```typescript
interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    role: 'admin' | 'user';
}

// Create a type with only name and age, both readonly
type ReadonlyBasicInfo = Readonly<Pick<User, 'name' | 'age'>>;

// Create a type with all properties except id and role
type UserWithoutIds = Omit<User, 'id' | 'role'>;

// Create a type with optional email and required other fields
type UserWithOptionalEmail = Omit<User, 'email'> & {
    email?: string;
};
```

## Best Practices

1. Use utility types for type transformations
```typescript
// ✅ Good
type UserUpdate = Partial<User>;

// ❌ Bad
interface UserUpdate {
    name?: string;
    age?: number;
    email?: string;
}
```

2. Combine utility types for complex transformations
```typescript
// ✅ Good
type ReadonlyUser = Readonly<Omit<User, 'id'>>;

// ❌ Bad
interface ReadonlyUser {
    readonly name: string;
    readonly age: number;
    readonly email: string;
}
```

3. Use Record for dictionary types
```typescript
// ✅ Good
type UserRoles = Record<string, boolean>;

// ❌ Bad
interface UserRoles {
    [key: string]: boolean;
}
```

4. Use Pick/Omit for focused types
```typescript
// ✅ Good
type UserBasicInfo = Pick<User, 'name' | 'age'>;

// ❌ Bad
interface UserBasicInfo {
    name: string;
    age: number;
}
```

## Common Pitfalls

1. Overusing utility types
```typescript
// ❌ Bad
type ComplexType = Partial<Readonly<Pick<User, 'name' | 'age'>>>;

// ✅ Better
type UserBasicInfo = {
    readonly name?: string;
    readonly age?: number;
};
```

2. Not understanding type inference
```typescript
// ❌ Bad
const user: Partial<User> = {
    name: 'John'
};
user.age = 30; // No error, but might be unexpected

// ✅ Good
const user: Partial<User> = {
    name: 'John',
    age: 30
};
```

3. Misusing Record
```typescript
// ❌ Bad
type UserMap = Record<User, string>; // Error: User is not a valid key type

// ✅ Good
type UserMap = Record<string, User>;
```

4. Ignoring type safety
```typescript
// ❌ Bad
type AnyProps = Record<string, any>;

// ✅ Good
type StringProps = Record<string, string>;
```

## Advanced Patterns

### 1. Deep Partial
```typescript
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface User {
    name: string;
    address: {
        street: string;
        city: string;
    };
}

type PartialUser = DeepPartial<User>;
```

### 2. Required Properties
```typescript
type RequiredProperties<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};

interface User {
    name?: string;
    age?: number;
    email: string;
}

type UserWithRequiredName = RequiredProperties<User, 'name'>;
```

### 3. Mutable
```typescript
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

interface ReadonlyUser {
    readonly name: string;
    readonly age: number;
}

type MutableUser = Mutable<ReadonlyUser>;
```

### 4. Type Guard
```typescript
type TypeGuard<T> = (value: unknown) => value is T;

function isString(value: unknown): value is string {
    return typeof value === 'string';
}

const stringGuard: TypeGuard<string> = isString;
``` 