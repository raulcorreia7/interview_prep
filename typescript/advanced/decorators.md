# TypeScript Decorators

Decorators are a special kind of declaration that can be attached to classes, methods, accessors, properties, or parameters.

## Class Decorators

```typescript
function Logger(target: Function) {
  console.log(`Class ${target.name} was defined`);
}

@Logger
class User {
  constructor(public name: string) {}
}
```

## Method Decorators

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method: ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class User {
  @Log
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}
```

## Property Decorators

```typescript
function DefaultValue(value: any) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = value;
  };
}

class User {
  @DefaultValue('John')
  name: string;
}
```

## Parameter Decorators

```typescript
function Validate(target: any, propertyKey: string, parameterIndex: number) {
  const validators = target.validators || (target.validators = {});
  validators[propertyKey] = validators[propertyKey] || [];
  validators[propertyKey].push(parameterIndex);
}

class User {
  greet(@Validate name: string) {
    return `Hello, ${name}!`;
  }
}
```

## Decorator Factories

```typescript
function Log(prefix: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${prefix}: Calling method: ${propertyKey}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class User {
  @Log('DEBUG')
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}
```

## Best Practices

1. **Type Safety**
   - Use proper type annotations
   - Validate decorator parameters
   - Handle edge cases
   - Use proper error handling

2. **Performance**
   - Avoid expensive operations
   - Use proper caching
   - Consider decorator complexity
   - Use proper optimization

3. **Maintainability**
   - Keep decorators focused
   - Use meaningful names
   - Document decorator behavior
   - Consider code organization

4. **Testing**
   - Write unit tests
   - Test edge cases
   - Use proper mocking
   - Test error scenarios

## Common Patterns

1. **Validation Decorator**
```typescript
function Validate(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    let value: number;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: number) {
      if (newVal < min || newVal > max) {
        throw new Error(`Value must be between ${min} and ${max}`);
      }
      value = newVal;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    });
  };
}

class User {
  @Validate(0, 120)
  age: number;
}
```

2. **Logging Decorator**
```typescript
function Log(level: 'info' | 'warn' | 'error') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console[level](`${propertyKey} called with:`, args);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class User {
  @Log('info')
  updateProfile(data: any) {
    // Implementation
  }
}
```

3. **Caching Decorator**
```typescript
function Cache(ttl: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, { value: any; expiry: number }>();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);

      if (cached && Date.now() < cached.expiry) {
        return cached.value;
      }

      const result = originalMethod.apply(this, args);
      cache.set(key, {
        value: result,
        expiry: Date.now() + ttl
      });

      return result;
    };
    return descriptor;
  };
}

class User {
  @Cache(1000)
  getProfile(id: number) {
    // Implementation
  }
}
```

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
function Log(target: any, propertyKey: string, descriptor: any) {
  // Implementation
}

// Good
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Implementation
}
```

2. **Error Handling**
```typescript
// Bad
function Validate(target: any, propertyKey: string) {
  // No error handling
}

// Good
function Validate(target: any, propertyKey: string) {
  try {
    // Implementation
  } catch (error) {
    console.error(`Validation failed for ${propertyKey}:`, error);
    throw error;
  }
}
```

3. **Performance**
```typescript
// Bad
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const cache = new Map();
  // No cache cleanup
}

// Good
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const cache = new Map();
  const cleanup = () => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now > value.expiry) {
        cache.delete(key);
      }
    }
  };
  setInterval(cleanup, 60000);
}
```