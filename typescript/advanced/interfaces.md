# Advanced Interfaces in TypeScript

Interfaces in TypeScript provide powerful features for backend development.

## Function Types

```typescript
// API Route Handler
interface RouteHandler {
  (req: Request, res: Response): Promise<void>;
}

// Database Query Function
interface QueryFunction<T> {
  (params: Record<string, any>): Promise<T[]>;
}
```

## Index Signatures

```typescript
// Database Configuration
interface DatabaseConfig {
  [key: string]: string | number | boolean;
}

// API Headers
interface ApiHeaders {
  [header: string]: string;
}
```

## Extending Interfaces

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
  password: string;
  role: 'admin' | 'user';
}
```

## Generic Interfaces

```typescript
// Repository Pattern
interface Repository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Service Layer
interface Service<T, R> {
  process(data: T): Promise<R>;
  validate(data: T): boolean;
}
```

## Interface vs Type Alias

```typescript
// Interface for API Response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

// Type Alias for API Error
type ApiError = {
  code: number;
  message: string;
  details?: Record<string, any>;
};
```

## Advanced Interface Patterns

1. **Repository Pattern**
```typescript
interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
  updatePassword(id: string, newPassword: string): Promise<void>;
}

class DatabaseUserRepository implements UserRepository {
  // Implementation
}
```

2. **Service Pattern**
```typescript
interface UserService {
  register(userData: UserRegistration): Promise<User>;
  login(credentials: LoginCredentials): Promise<AuthToken>;
  updateProfile(userId: string, profile: UserProfile): Promise<User>;
}

class UserServiceImpl implements UserService {
  // Implementation
}
```

3. **Middleware Pattern**
```typescript
interface Middleware {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface ErrorMiddleware {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}
```

## Advanced Best Practices

1. **Interface Design**
   - Design interfaces for specific domains (users, orders, products)
   - Use proper inheritance for shared functionality
   - Consider composition for complex features
   - Use proper abstraction for database operations

2. **Documentation**
   - Document interfaces for API endpoints
   - Document properties for database models
   - Document methods for service layers
   - Use proper comments for complex logic

3. **Type Safety**
   - Use strict typing for API requests/responses
   - Avoid using `any` in database operations
   - Use proper type guards for external data
   - Validate data at service boundaries

## Common Pitfalls

1. **Excessive Properties**
```typescript
// Bad
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  // ... many more properties
}

// Good
interface User {
  id: string;
  credentials: UserCredentials;
  profile: UserProfile;
  contact: ContactInfo;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface UserProfile {
  name: string;
  // Profile specific properties
}

interface ContactInfo {
  address: string;
  phone: string;
}
```

2. **Improper Type Safety**
```typescript
// Bad
interface ApiResponse {
  data: any;
}

// Good
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
}
```

## Hybrid Types

```typescript
// API Client
interface ApiClient {
  // Function
  (endpoint: string, options?: RequestOptions): Promise<Response>;
  
  // Properties
  baseUrl: string;
  headers: Record<string, string>;
  
  // Methods
  setAuthToken(token: string): void;
  clearAuthToken(): void;
}
```

## Interface Merging

```typescript
// Base API Configuration
interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Extended API Configuration
interface ApiConfig {
  retryAttempts: number;
  retryDelay: number;
}

// Usage
const config: ApiConfig = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retryAttempts: 3,
  retryDelay: 1000
};
```

## Advanced Generic Interfaces

```typescript
// Generic Service with Constraints
interface EntityService<T extends BaseEntity> {
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Generic Repository with Multiple Type Parameters
interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}
```

## Interface Constraints

```typescript
// Constraint with keyof for Database Operations
function updateEntity<T extends BaseEntity, K extends keyof T>(
  entity: T,
  key: K,
  value: T[K]
): Promise<T> {
  // Implementation
}

// Constraint with type parameter for Validation
interface Validatable {
  validate(): boolean;
}

function processEntity<T extends Validatable>(entity: T): void {
  if (entity.validate()) {
    // Process valid entity
  }
}
``` 