# Backend-Specific TypeScript Patterns

## API Design Patterns [Common]

### Request/Response Types
```typescript
// API Response Type
type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: {
    code: string;
    message: string;
  };
};

// Usage
async function getUser(id: string): Promise<ApiResponse<User>> {
  try {
    const user = await db.users.findUnique({ where: { id } });
    return { data: user, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      }
    };
  }
}
```

### Validation Types
```typescript
// Zod Schema Example
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().min(18).optional()
});

type User = z.infer<typeof UserSchema>;

// Usage
function validateUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

## Database Patterns [Advanced]

### Entity Types
```typescript
// Base Entity
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Entity
interface User extends BaseEntity {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Relations
interface Post extends BaseEntity {
  title: string;
  content: string;
  author: User;
  comments: Comment[];
}
```

### Repository Pattern
```typescript
interface Repository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  // Implementation
}
```

## Error Handling [Common]

### Custom Error Types
```typescript
class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super('NOT_FOUND', message, 404);
  }
}

// Usage
function getUser(id: string): Promise<User> {
  const user = await db.users.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundError(`User ${id} not found`);
  }
  return user;
}
```

## Middleware Patterns [Advanced]

### Type-Safe Middleware
```typescript
type Middleware<T = any> = (
  context: T,
  next: () => Promise<void>
) => Promise<void>;

class Context {
  constructor(
    public request: Request,
    public response: Response,
    public user?: User
  ) {}
}

// Usage
const authMiddleware: Middleware<Context> = async (ctx, next) => {
  const token = ctx.request.headers.authorization;
  if (!token) {
    throw new ApiError('UNAUTHORIZED', 'Missing token', 401);
  }
  ctx.user = await validateToken(token);
  await next();
};
```

## Performance Patterns [Mastery]

### Caching Types
```typescript
interface Cache<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

class RedisCache<T> implements Cache<T> {
  // Implementation
}
```

### Batch Processing
```typescript
async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

## Interview Focus Areas

### Core Knowledge [Core]
- API response types
- Basic error handling
- Entity types
- Validation patterns

### Common Interview Questions [Common]
- How do you handle API errors?
- How do you validate request data?
- How do you structure your database types?
- How do you implement middleware?

### Advanced Topics [Advanced]
- Repository pattern
- Type-safe middleware
- Complex entity relations
- Performance optimization

### Mastery Level [Mastery]
- Advanced caching patterns
- Complex type manipulation
- Performance tuning
- Architecture design 