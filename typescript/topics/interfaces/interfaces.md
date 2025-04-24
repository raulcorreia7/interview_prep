# Interfaces in TypeScript

## Basic Interfaces [Core]

### Interface Declaration [Core]

```typescript
interface User {
  name: string;
  age: number;
  email?: string;
  readonly id: number;
}
```

### Optional Properties [Core]

```typescript
interface Config {
  required: string;
  optional?: number;
  readonly constant: boolean;
}
```

## Function Types [Common]

### Function Interfaces [Common]

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = function (source: string, subString: string) {
  return source.search(subString) > -1;
};
```

### Method Interfaces [Common]

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}
```

## Advanced Interfaces [Advanced]

### Indexable Types [Advanced]

```typescript
interface StringArray {
  [index: number]: string;
}

interface NumberDictionary {
  [key: string]: number;
  length: number;
  name: string; // Error: Property 'name' of type 'string' is not assignable to string index type 'number'
}
```

### Hybrid Types [Advanced]

```typescript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {
    return start.toString();
  };
  counter.interval = 123;
  counter.reset = function () {
    counter.interval = 0;
  };
  return counter;
}
```

## Interface Inheritance [Common]

### Extending Interfaces [Common]

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

interface Circle extends Shape {
  radius: number;
}
```

### Multiple Inheritance [Common]

```typescript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}
```

## Best Practices [Core]

1. Use interfaces for object shapes
2. Prefer interfaces over type aliases for object types
3. Use readonly for immutable properties
4. Document interface properties
5. Use proper naming conventions
6. Consider using index signatures [Common]
7. Use proper inheritance patterns [Common]
8. Document complex interfaces
9. Use proper method signatures
10. Consider using hybrid types [Advanced]

## Common Patterns [Common]

### Factory Pattern [Common]

```typescript
interface Animal {
  makeSound(): void;
}

interface AnimalFactory {
  createAnimal(type: string): Animal;
}
```

### Strategy Pattern [Common]

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using credit card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}
```

## Interview Focus Areas

### Core Knowledge [Core]

- Interface declaration
- Optional properties
- Readonly properties
- Basic interface usage
- Interface vs type alias

### Common Interview Questions [Common]

- What's the difference between interface and type?
- When should you use interfaces vs type aliases?
- How do you handle optional properties in interfaces?
- What are function interfaces and how do you use them?

### Advanced Topics [Advanced]

- Indexable types
- Hybrid types
- Advanced inheritance
- Complex interface patterns

### Mastery Level [Mastery]

- Advanced type manipulation with interfaces
- Performance implications of interfaces
- Complex design patterns with interfaces
- Advanced interface composition
