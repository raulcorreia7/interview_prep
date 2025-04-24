# Functional Programming in TypeScript

## Basic Concepts [Core]

### Pure Functions [Core]

```typescript
// Pure function
function add(a: number, b: number): number {
  return a + b;
}

// Impure function
let total = 0;
function addToTotal(value: number): void {
  total += value;
}
```

### Immutability [Core]

```typescript
// Mutable approach
const numbers = [1, 2, 3];
numbers.push(4);

// Immutable approach
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];
```

## Array Operations [Core]

### Map [Core]

```typescript
function map<T, R>(arr: T[], fn: (item: T) => R): R[] {
  return arr.reduce((acc, item) => [...acc, fn(item)], [] as R[]);
}

// Usage
const numbers = [1, 2, 3];
const doubled = map(numbers, (x) => x * 2); // [2, 4, 6]
```

### Filter [Core]

```typescript
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.reduce((acc, item) => (predicate(item) ? [...acc, item] : acc), [] as T[]);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const evens = filter(numbers, (x) => x % 2 === 0); // [2, 4]
```

### Reduce [Core]

```typescript
function reduce<T, R>(arr: T[], fn: (acc: R, item: T) => R, initialValue: R): R {
  let result = initialValue;
  for (const item of arr) {
    result = fn(result, item);
  }
  return result;
}

// Usage
const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, x) => acc + x, 0); // 10
```

## Function Composition [Common]

### Basic Composition [Common]

```typescript
type FunctionType<T, R> = (arg: T) => R;

function compose<T, U, R>(f: FunctionType<U, R>, g: FunctionType<T, U>): FunctionType<T, R> {
  return (x: T) => f(g(x));
}

const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const addOneAndDouble = compose(double, addOne);
```

### Higher-Order Functions [Common]

```typescript
// Example of a higher-order function that takes a function as an argument
function applyOperation<T, R>(value: T, operation: (value: T) => R): R {
  return operation(value);
}

// Usage
const result = applyOperation(5, (x) => x * 2); // 10
```

## Advanced Concepts [Advanced]

### Currying [Advanced]

```typescript
function curry<T, U, R>(fn: (a: T, b: U) => R): (a: T) => (b: U) => R {
  return (a: T) => (b: U) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
console.log(addFive(3)); // 8
```

### Monads [Mastery]

```typescript
class Maybe<T> {
  private constructor(private value: T | null) {}

  static of<T>(value: T | null): Maybe<T> {
    return new Maybe(value);
  }

  map<R>(fn: (value: T) => R): Maybe<R> {
    return this.value === null ? Maybe.of<R>(null) : Maybe.of(fn(this.value));
  }

  flatMap<R>(fn: (value: T) => Maybe<R>): Maybe<R> {
    return this.value === null ? Maybe.of<R>(null) : fn(this.value);
  }
}
```

## Best Practices [Core]

1. Prefer pure functions
2. Use immutability
3. Avoid side effects
4. Use function composition
5. Leverage TypeScript's type system
6. Use higher-order functions [Common]
7. Consider performance implications [Common]
8. Use proper error handling [Common]
9. Document function behavior
10. Consider testing implications

## Common Patterns [Common]

### Pipeline Pattern [Common]

```typescript
interface Pipeline<T> {
  pipe<R>(fn: (value: T) => R): Pipeline<R>;
  value(): T;
}

function pipeline<T>(initialValue: T): Pipeline<T> {
  let value = initialValue;

  return {
    pipe<R>(fn: (value: T) => R): Pipeline<R> {
      value = fn(value) as any;
      return this as any;
    },
    value() {
      return value;
    },
  };
}

const result = pipeline(5)
  .pipe((x) => x * 2)
  .pipe((x) => x + 1)
  .value(); // 11
```

### Memoization Pattern [Common]

```typescript
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  } as T;
}

const expensiveCalculation = memoize((n: number) => {
  console.log("Calculating...");
  return n * n;
});
```

## Interview Focus Areas

### Core Knowledge [Core]

- Pure functions
- Immutability
- Map, filter, reduce operations
- Basic function composition
- Higher-order functions

### Common Interview Questions [Common]

- What is functional programming?
- How do you handle side effects?
- What are pure functions?
- How do you implement map/filter/reduce?
- How do you implement immutability?

### Advanced Topics [Advanced]

- Currying
- Function composition
- Advanced patterns
- Type system usage

### Mastery Level [Mastery]

- Monads
- Advanced functional patterns
- Performance optimization
- Complex type system usage
