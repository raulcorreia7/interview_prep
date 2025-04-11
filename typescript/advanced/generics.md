# Generics in TypeScript

Generics allow you to create reusable components that can work with different types while maintaining type safety.

## Basic Generic Functions

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>('hello');
const num = identity<number>(42);
```

## Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity('hello'); // OK
loggingIdentity([1, 2, 3]); // OK
// loggingIdentity(42); // Error: number doesn't have length
```

## Generic Classes

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
```

## Generic Interfaces

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## Generic Type Aliases

```typescript
type Container<T> = {
  value: T;
};

const stringContainer: Container<string> = {
  value: 'hello'
};
```

## Generic Utility Types

```typescript
// Partial<T>
type PartialUser = Partial<User>;

// Readonly<T>
type ReadonlyUser = Readonly<User>;

// Pick<T, K>
type UserName = Pick<User, 'name'>;

// Record<K, T>
type UserRoles = Record<string, boolean>;
```

## Generic Constraints with Multiple Types

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: 'John',
  age: 30
};

const name = getProperty(user, 'name'); // OK
// const role = getProperty(user, 'role'); // Error: 'role' is not a key of user
```

## Generic Default Types

```typescript
interface Container<T = string> {
  value: T;
}

const stringContainer: Container = { value: 'hello' };
const numberContainer: Container<number> = { value: 42 };
```

## Generic Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Best Practices

1. **Type Safety**
   - Use proper type constraints
   - Avoid using `any`
   - Use proper type guards
   - Validate generic parameters

2. **Generic Design**
   - Keep generics focused
   - Use meaningful type parameters
   - Consider type reusability
   - Use proper documentation

3. **Performance**
   - Avoid deep generic nesting
   - Use proper type inference
   - Consider type complexity
   - Use proper type caching

4. **Maintainability**
   - Group related generics
   - Use proper naming conventions
   - Consider generic hierarchies
   - Use proper generic exports

## Common Patterns

1. **Factory Pattern**
```typescript
interface Factory<T> {
  create(): T;
}

class UserFactory implements Factory<User> {
  create(): User {
    return {
      id: generateId(),
      name: 'New User',
      age: 0
    };
  }
}
```

2. **Repository Pattern**
```typescript
interface Repository<T> {
  get(id: number): T;
  save(item: T): void;
  delete(id: number): void;
}

class UserRepository implements Repository<User> {
  get(id: number): User {
    // Implementation
  }
  save(user: User): void {
    // Implementation
  }
  delete(id: number): void {
    // Implementation
  }
}
```

3. **Builder Pattern**
```typescript
interface Builder<T> {
  set<K extends keyof T>(key: K, value: T[K]): Builder<T>;
  build(): T;
}

class UserBuilder implements Builder<User> {
  private user: Partial<User> = {};

  set<K extends keyof User>(key: K, value: User[K]): this {
    this.user[key] = value;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}
```

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
function process<T>(data: T) {
  return data.value; // Error: T might not have 'value'
}

// Good
interface HasValue {
  value: string;
}
function process<T extends HasValue>(data: T) {
  return data.value;
}
```

2. **Generic Constraints**
```typescript
// Bad
function getLength<T>(arg: T): number {
  return arg.length; // Error: T might not have 'length'
}

// Good
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

3. **Type Inference**
```typescript
// Bad
const process = <T>(data: T) => {
  // Complex logic
};

// Good
function process<T>(data: T): T {
  return data;
}
```