# Generics in TypeScript

## Basic Generics [Core]

### Generic Functions [Core]
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let output2 = identity("hello"); // Type inference
```

### Generic Interfaces [Common]
```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## Generic Classes [Common]

### Basic Generic Class [Common]
```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### Generic Constraints [Common]
```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## Advanced Generics [Advanced]

### Generic Constraints with Keyof [Advanced]
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'
```

### Generic Type Aliases [Advanced]
```typescript
type Container<T> = { value: T };

type Tree<T> = {
  value: T;
  left: Tree<T> | null;
  right: Tree<T> | null;
};
```

## Best Practices [Core]

1. Use generics for reusable components
2. Use type inference when possible
3. Add constraints when needed
4. Use proper naming conventions
5. Document generic parameters
6. Consider using default types [Common]
7. Use proper type constraints [Common]
8. Document complex generics
9. Use proper type inference
10. Consider using mapped types [Advanced]

## Common Patterns [Common]

### Factory Pattern [Common]
```typescript
interface Factory<T> {
  create(): T;
}

class NumberFactory implements Factory<number> {
  create(): number {
    return Math.random();
  }
}
```

### Repository Pattern [Common]
```typescript
interface Repository<T> {
  findById(id: string): T | undefined;
  save(entity: T): void;
  delete(id: string): void;
}

class UserRepository implements Repository<User> {
  // Implementation
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic generic functions
- Generic type parameters
- Type inference with generics
- Basic generic constraints
- Generic interfaces

### Common Interview Questions [Common]
- What are generics and why are they useful?
- How do you use generic constraints?
- What's the difference between any and generic types?
- How do you implement generic interfaces?

### Advanced Topics [Advanced]
- Generic type aliases
- Advanced constraints
- Mapped types with generics
- Conditional types with generics

### Mastery Level [Mastery]
- Complex generic patterns
- Advanced type inference
- Performance implications of generics
- Advanced generic composition