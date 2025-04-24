# TypeScript Type System

## Type Inference [Core]

### Basic Inference
```typescript
let x = 10;        // TypeScript infers number
let y = "hello";   // TypeScript infers string
let z = true;      // TypeScript infers boolean
```

### Contextual Typing
```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  // TypeScript knows this is a MouseEvent
};
```

## Type Guards [Common]

### typeof Guards
```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  return padding + value;
}
```

### instanceof Guards
```typescript
class Bird {
  fly() {
    console.log("flying");
  }
}

class Fish {
  swim() {
    console.log("swimming");
  }
}

function move(pet: Bird | Fish) {
  if (pet instanceof Bird) {
    pet.fly();
  } else {
    pet.swim();
  }
}
```

## Type Compatibility [Advanced]

### Structural Typing
```typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(p.x, p.y);
}

const point = { x: 10, y: 20, z: 30 };
printPoint(point); // OK, extra properties are allowed
```

### Function Compatibility
```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

## Type System Design [Mastery]

### Type Safety
```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

function createUser(user: Partial<User>): User {
  return {
    id: user.id ?? 0,
    name: user.name ?? "",
    email: user.email ?? ""
  };
}
```

### Type System Patterns
```typescript
type Result<T> = 
  | { type: "success"; value: T }
  | { type: "error"; error: Error };

function processResult<T>(result: Result<T>): void {
  switch (result.type) {
    case "success":
      console.log(result.value);
      break;
    case "error":
      console.error(result.error);
      break;
  }
}
```

## Related Topics
- [Types](./../types/types.md)
- [Variables](./../variables/variables.md)
- [Interfaces](./../interfaces/interfaces.md)
- [Type Features](./../type-features/type-features.md)

## Interview Focus Areas

### Core Knowledge
- Type inference
- Basic type guards
- Type compatibility
- Structural typing

### Common Interview Questions
- How does TypeScript's type inference work?
- What are type guards and how do you use them?
- How does structural typing work in TypeScript?
- What's the difference between nominal and structural typing?

### Advanced Topics
- Advanced type guards
- Function compatibility
- Type system design patterns
- Type safety patterns

### Mastery Level
- Complex type system patterns
- Type system architecture
- Performance considerations
- Compiler optimization techniques 