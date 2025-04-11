# Basic Classes in TypeScript

Classes in TypeScript provide object-oriented programming features with type safety.

## Basic Class Declaration

```typescript
class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

// Using the class
const person = new Person('John', 30);
console.log(person.greet());
```

## Access Modifiers

```typescript
class Person {
  public name: string;    // Accessible everywhere
  private age: number;    // Accessible only within class
  protected id: string;   // Accessible within class and subclasses

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.id = '123';
  }
}
```

## Basic Best Practices

1. **Class Design**
   - Keep classes focused
   - Use clear, descriptive names
   - Follow single responsibility principle
   - Use proper access modifiers

2. **Type Safety**
   - Define property types
   - Use proper access modifiers
   - Avoid using `any` type
   - Validate input parameters

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
class User {
  data: any;
}

// Good
class User {
  name: string;
  age: number;
}
```

2. **Access Control**
```typescript
// Bad
class User {
  password: string;
}

// Good
class User {
  private password: string;
  
  public setPassword(newPassword: string): void {
    // Add validation
    this.password = newPassword;
  }
}
``` 