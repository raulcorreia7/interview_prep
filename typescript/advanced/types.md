# Advanced Types in TypeScript

TypeScript provides powerful type system features for complex backend scenarios.

## Special Types

```typescript
// Unknown - For handling external API responses
async function fetchUserData(): Promise<unknown> {
  const response = await fetch('/api/users');
  return response.json();
}

// Never - For exhaustive type checking in error handling
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

// Void - For database operations
async function logDatabaseOperation(): Promise<void> {
  await db.log('Operation completed');
}
```

## Union and Intersection Types

```typescript
// Union Types for API responses
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

// Intersection Types for database entities
interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
}

type UserWithTimestamps = User & Timestamp;
```

## Literal Types

```typescript
// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Database Operation Status
type OperationStatus = 'pending' | 'completed' | 'failed';

function handleDatabaseOperation(status: OperationStatus): void {
  switch (status) {
    case 'pending':
      // Handle pending
      break;
    case 'completed':
      // Handle completed
      break;
    case 'failed':
      // Handle failed
      break;
  }
}
```

## Type Aliases

```typescript
// Database IDs
type UserID = string;
type OrderID = string;

// API Response Types
type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
```

## Advanced Type Patterns

1. **Discriminated Unions for API Responses**
```typescript
type Success<T> = {
  type: 'success';
  data: T;
};

type Error = {
  type: 'error';
  code: number;
  message: string;
};

type ApiResult<T> = Success<T> | Error;

async function handleApiResponse<T>(result: ApiResult<T>): Promise<void> {
  if (result.type === 'success') {
    await processData(result.data);
  } else {
    await logError(result.code, result.message);
  }
}
```

2. **Mapped Types for Database Models**
```typescript
// Make all properties optional for partial updates
type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly for immutable data
type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};
```

3. **Conditional Types for API Validation**
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type ValidatedInput<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
```

## Template Literal Types

```typescript
// API Endpoints
type ApiVersion = 'v1' | 'v2';
type Resource = 'users' | 'orders' | 'products';

type ApiEndpoint = `/${ApiVersion}/${Resource}`;

// Database Table Names
type TablePrefix = 'tbl_';
type TableName = 'users' | 'orders' | 'products';

type FullTableName = `${TablePrefix}${TableName}`;
```

## Recursive Types

```typescript
// Category Tree for E-commerce
type Category = {
  id: string;
  name: string;
  children?: Category[];
};

// Comment Thread
type Comment = {
  id: string;
  content: string;
  replies?: Comment[];
};
```

## Utility Types

```typescript
// Database Operations
type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateInput<T> = Partial<Omit<T, 'id' | 'createdAt'>>;

// API Response Types
type ApiResponse<T> = {
  success: boolean;
  data: T;
  timestamp: Date;
};
```

## Advanced Conditional Types

```typescript
// Extract Promise type for async operations
type PromiseType<T> = T extends Promise<infer U> ? U : never;

// Deep readonly for immutable data structures
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## Advanced Best Practices

1. **Type Design**
   - Use proper type hierarchies for database models
   - Consider type reusability across API endpoints
   - Use proper type exports for shared types
   - Document complex types for API documentation

2. **Type Inference**
   - Use explicit types for public API endpoints
   - Consider type readability for database schemas
   - Use proper type annotations for request/response types
   - Leverage type inference for internal operations

3. **Type Organization**
   - Group related types by domain (users, orders, products)
   - Use proper naming conventions for API types
   - Consider type hierarchies for database relationships
   - Use proper type exports for shared modules