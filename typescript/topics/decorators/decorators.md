# Decorators in TypeScript

## Basic Decorators [Core]

### Class Decorators [Core]
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}
```

### Method Decorators [Common]
```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

## Property Decorators [Common]

### Basic Property Decorators [Common]
```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value = target[propertyKey];
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newVal: string) {
      value = formatString.replace('%s', newVal);
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class User {
  @format('Hello, %s!')
  greeting: string;
}
```

### Accessor Decorators [Common]
```typescript
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  
  @configurable(false)
  get x() { return this._x; }
  
  @configurable(true)
  get y() { return this._y; }
}
```

## Parameter Decorators [Advanced]

### Basic Parameter Decorators [Advanced]
```typescript
function validate(target: any, propertyKey: string, parameterIndex: number) {
  const validators = Reflect.getMetadata('validators', target, propertyKey) || [];
  validators.push(parameterIndex);
  Reflect.defineMetadata('validators', validators, target, propertyKey);
}

class UserService {
  getUser(@validate id: number) {
    // Implementation
  }
}
```

## Advanced Decorators [Advanced]

### Decorator Factories [Advanced]
```typescript
function logWithPrefix(prefix: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      console.log(`[${prefix}] Calling ${propertyKey} with args:`, args);
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

class Logger {
  @logWithPrefix('DEBUG')
  debug(message: string) {
    console.log(message);
  }
}
```

## Best Practices [Core]

1. Use decorators sparingly
2. Keep decorators simple and focused
3. Document decorator behavior
4. Use proper type annotations
5. Consider performance implications
6. Use decorator factories [Common]
7. Handle errors appropriately [Common]
8. Consider metadata usage [Advanced]
9. Use proper naming conventions
10. Consider composition [Advanced]

## Common Patterns [Common]

### Validation Pattern [Common]
```typescript
function validate(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    let value = target[propertyKey];
    
    const getter = function() {
      return value;
    };
    
    const setter = function(newVal: number) {
      if (newVal < min || newVal > max) {
        throw new Error(`Value must be between ${min} and ${max}`);
      }
      value = newVal;
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class User {
  @validate(0, 120)
  age: number;
}
```

### Logging Pattern [Common]
```typescript
function logExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function(...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`Execution time: ${end - start}ms`);
    return result;
  };
  
  return descriptor;
}

class DataService {
  @logExecutionTime
  async fetchData() {
    // Implementation
  }
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic decorator syntax
- Class decorators
- Method decorators
- Property decorators
- Basic decorator usage

### Common Interview Questions [Common]
- What are decorators and how do they work?
- How do you create a method decorator?
- What are decorator factories?
- How do you handle validation with decorators?

### Advanced Topics [Advanced]
- Parameter decorators
- Metadata reflection
- Advanced decorator patterns
- Decorator composition

### Mastery Level [Mastery]
- Complex decorator patterns
- Performance optimization
- Advanced metadata usage
- Custom decorator frameworks