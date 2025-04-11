# TypeScript Async/Await

Async/await is a modern way to handle asynchronous operations in TypeScript, providing a more readable and maintainable alternative to promise chains.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Error Handling](#error-handling)
- [Promise Conversion](#promise-conversion)
- [Parallel Execution](#parallel-execution)
- [Type Definitions](#type-definitions)
- [Best Practices](#best-practices)
- [Common Pitfalls](#common-pitfalls)

## Basic Syntax

### Async Functions
```typescript
async function fetchData(): Promise<string> {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}
```

### Async Arrow Functions
```typescript
const fetchData = async (): Promise<string> => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
};
```

### Async Methods
```typescript
class DataFetcher {
    async fetchData(): Promise<string> {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    }
}
```

## Error Handling

### Try-Catch Blocks
```typescript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
```

### Error Types
```typescript
class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new ApiError('API request failed', response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            console.error(`API Error (${error.status}):`, error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}
```

## Promise Conversion

### Converting Callbacks to Promises
```typescript
function readFileAsync(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

// Usage
async function processFile() {
    try {
        const content = await readFileAsync('file.txt');
        console.log(content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
```

### Converting Promises to Async/Await
```typescript
// Promise version
function fetchData(): Promise<string> {
    return fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => data);
}

// Async/await version
async function fetchData(): Promise<string> {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}
```

## Parallel Execution

### Promise.all
```typescript
async function fetchMultipleData() {
    try {
        const [user, posts] = await Promise.all([
            fetchUser(),
            fetchPosts()
        ]);
        return { user, posts };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
```

### Promise.race
```typescript
async function fetchWithTimeout(url: string, timeout: number) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), timeout);
    });

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

## Type Definitions

### Function Return Types
```typescript
async function fetchData(): Promise<string> {
    const response = await fetch('https://api.example.com/data');
    return await response.json();
}
```

### Interface with Async Methods
```typescript
interface DataService {
    fetchData(): Promise<string>;
    saveData(data: string): Promise<void>;
}

class ApiService implements DataService {
    async fetchData(): Promise<string> {
        const response = await fetch('https://api.example.com/data');
        return await response.json();
    }

    async saveData(data: string): Promise<void> {
        await fetch('https://api.example.com/data', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
```

## Best Practices

1. Always use try-catch blocks
```typescript
// ✅ Good
async function fetchData() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// ❌ Bad
async function fetchData() {
    const response = await fetch(url);
    return await response.json();
}
```

2. Use Promise.all for parallel operations
```typescript
// ✅ Good
async function fetchAllData() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
    ]);
    return { user, posts };
}

// ❌ Bad
async function fetchAllData() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    return { user, posts };
}
```

3. Handle errors appropriately
```typescript
// ✅ Good
async function processData() {
    try {
        const data = await fetchData();
        return await transformData(data);
    } catch (error) {
        if (error instanceof ApiError) {
            // Handle API errors
        } else {
            // Handle other errors
        }
        throw error;
    }
}
```

4. Use async/await consistently
```typescript
// ✅ Good
async function process() {
    const data = await fetchData();
    const result = await processData(data);
    return result;
}

// ❌ Bad
async function process() {
    return fetchData()
        .then(data => processData(data))
        .then(result => result);
}
```

## Common Pitfalls

1. Forgetting await
```typescript
// ❌ Bad
async function process() {
    const promise = fetchData(); // Forgot await
    return promise; // Returns Promise<Promise<T>>
}

// ✅ Good
async function process() {
    const data = await fetchData();
    return data;
}
```

2. Unnecessary async/await
```typescript
// ❌ Bad
async function getValue() {
    return await 42; // Unnecessary await
}

// ✅ Good
async function getValue() {
    return 42;
}
```

3. Not handling promise rejections
```typescript
// ❌ Bad
async function fetchData() {
    const response = await fetch(url);
    return response.json();
}

// ✅ Good
async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

4. Mixing promise chains and async/await
```typescript
// ❌ Bad
async function process() {
    return fetchData()
        .then(data => {
            return processData(data);
        })
        .then(result => {
            return await saveData(result); // Mixed style
        });
}

// ✅ Good
async function process() {
    const data = await fetchData();
    const processed = await processData(data);
    return await saveData(processed);
}
```

## Advanced Patterns

### 1. Retry Pattern
```typescript
async function retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}
```

### 2. Timeout Pattern
```typescript
async function withTimeout<T>(
    promise: Promise<T>,
    timeout: number
): Promise<T> {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), timeout);
    });

    return Promise.race([promise, timeoutPromise]) as Promise<T>;
}
```

### 3. Batch Processing
```typescript
async function processInBatches<T, R>(
    items: T[],
    processItem: (item: T) => Promise<R>,
    batchSize: number = 10
): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );
        results.push(...batchResults);
    }
    
    return results;
}
```

### 4. Async Queue
```typescript
class AsyncQueue<T> {
    private queue: T[] = [];
    private processing = false;

    async enqueue(item: T): Promise<void> {
        this.queue.push(item);
        if (!this.processing) {
            await this.processQueue();
        }
    }

    private async processQueue(): Promise<void> {
        this.processing = true;
        while (this.queue.length > 0) {
            const item = this.queue.shift()!;
            try {
                await this.processItem(item);
            } catch (error) {
                console.error('Error processing item:', error);
            }
        }
        this.processing = false;
    }

    private async processItem(item: T): Promise<void> {
        // Process the item
    }
}
``` 