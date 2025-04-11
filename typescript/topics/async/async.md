# Asynchronous Programming in TypeScript

## Promises [Core]

### Basic Promises [Core]
```typescript
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received");
  }, 1000);
});

promise.then(data => console.log(data));
```

### Promise Chaining [Common]
```typescript
fetchData()
  .then(data => processData(data))
  .then(result => saveData(result))
  .catch(error => handleError(error));
```

## Async/Await [Core]

### Basic Async/Await [Core]
```typescript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
```

### Error Handling [Common]
```typescript
async function processData() {
  try {
    const data = await fetchData();
    return await processResult(data);
  } catch (error) {
    if (error instanceof NetworkError) {
      // Handle network error
    } else if (error instanceof ValidationError) {
      // Handle validation error
    } else {
      // Handle other errors
    }
  }
}
```

## Advanced Patterns [Advanced]

### Promise.all [Common]
```typescript
async function fetchMultipleData() {
  const [userData, postsData] = await Promise.all([
    fetchUserData(),
    fetchPostsData()
  ]);
  return { userData, postsData };
}
```

### Promise.race [Advanced]
```typescript
async function fetchWithTimeout(url: string, timeout: number) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });

  return Promise.race([
    fetch(url),
    timeoutPromise
  ]);
}
```

## Best Practices [Core]

1. Always handle promise rejections
2. Use async/await for better readability
3. Use proper error handling
4. Avoid promise nesting
5. Use proper type annotations
6. Consider using Promise.all [Common]
7. Handle timeouts appropriately [Common]
8. Use proper error types
9. Document async functions
10. Consider using cancellation [Advanced]

## Common Patterns [Common]

### Retry Pattern [Common]
```typescript
async function retry<T>(
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

### Debounce Pattern [Common]
```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- Basic promise usage
- Async/await syntax
- Error handling in async code
- Basic promise chaining
- Type annotations for async code

### Common Interview Questions [Common]
- What's the difference between promises and async/await?
- How do you handle errors in async code?
- What is Promise.all and when would you use it?
- How do you implement retry logic for async operations?

### Advanced Topics [Advanced]
- Promise.race and timeout patterns
- Advanced error handling
- Cancellation patterns
- Complex async flows

### Mastery Level [Mastery]
- Advanced promise patterns
- Performance optimization in async code
- Complex error recovery
- Advanced type inference in async code 