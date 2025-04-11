# Error Handling in TypeScript

## Try/Catch [Core]

### Basic Error Handling [Core]
```typescript
try {
  // Code that might throw an error
  const result = riskyOperation();
} catch (error) {
  // Handle the error
  console.error('An error occurred:', error);
}
```

### Error Type Checking [Common]
```typescript
try {
  // Code that might throw an error
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Custom Errors [Common]

### Creating Custom Error Classes [Common]
```typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class DatabaseError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
```

### Using Custom Errors [Common]
```typescript
function validateUser(user: User) {
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  }
}
```

## Error Types [Core]

### Built-in Error Types [Core]
```typescript
// Common error types
Error
RangeError
ReferenceError
SyntaxError
TypeError
URIError
```

### TypeScript Error Types [Advanced]
```typescript
// TypeScript specific errors
interface TypeError {
  message: string;
  code: number;
  stack?: string;
}

interface CompilerError {
  message: string;
  file: string;
  line: number;
  column: number;
}
```

## Error Patterns [Common]

### Error Wrapping [Common]
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public originalError?: Error,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

function handleError(error: unknown): never {
  if (error instanceof Error) {
    throw new AppError('Operation failed', error, { timestamp: Date.now() });
  }
  throw new AppError('Unknown error occurred');
}
```

### Error Boundaries [Advanced]
```typescript
class ErrorBoundary {
  static handle(error: Error): void {
    // Log error
    console.error('Error caught by boundary:', error);
    
    // Notify monitoring service
    monitoringService.report(error);
    
    // Show user-friendly message
    showErrorMessage('Something went wrong. Please try again.');
  }
}
```

### Promise Error Handling [Core]
```typescript
// Using .catch()
promise
  .then(result => processResult(result))
  .catch(error => handleError(error));

// Using async/await
async function processData() {
  try {
    const result = await fetchData();
    return processResult(result);
  } catch (error) {
    handleError(error);
  }
}
```

## Best Practices [Core]

1. Always use try/catch for synchronous code that might throw errors
2. Handle promises with .catch() or try/catch with async/await
3. Create custom error classes for specific error types
4. Include relevant context in error messages
5. Log errors with appropriate severity levels
6. Use error boundaries to prevent application crashes [Advanced]
7. Implement proper error recovery strategies [Advanced]
8. Document error handling in function signatures
9. Use type guards to narrow error types
10. Consider using error monitoring services [Advanced]

## Common Patterns [Common]

### Error Factory [Common]
```typescript
function createError(type: string, message: string, context?: Record<string, unknown>) {
  return {
    type,
    message,
    timestamp: Date.now(),
    context
  };
}
```

### Error Handling Middleware [Common]
```typescript
function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof DatabaseError) {
    return res.status(500).json({ error: 'Database error' });
  }
  return res.status(500).json({ error: 'Internal server error' });
}
```

### Error Recovery [Advanced]
```typescript
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  
  throw lastError;
}
```

## Type Safety [Common]

### Error Type Guards [Common]
```typescript
function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof DatabaseError;
}
```

### Error Result Type [Advanced]
```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function safeOperation<T>(operation: () => T): Result<T> {
  try {
    return { success: true, data: operation() };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic try/catch usage
- Promise error handling
- Built-in error types
- Basic error handling patterns

### Common Interview Questions [Common]
- How do you handle errors in async code?
- How do you create and use custom error classes?
- What are the differences between throw and return error?
- How do you handle different types of errors?

### Advanced Topics [Advanced]
- Error boundaries
- Error recovery strategies
- Type-safe error handling
- Error monitoring integration

### Mastery Level [Mastery]
- Complex error recovery patterns
- Custom error monitoring systems
- Advanced type safety patterns
- Performance optimization in error handling 