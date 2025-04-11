# Advanced Classes in TypeScript

TypeScript classes provide powerful object-oriented programming features for backend development.

## Inheritance

```typescript
// Base Service
abstract class BaseService<T> {
  constructor(protected repository: Repository<T>) {}
  
  async findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }
  
  abstract validate(data: Partial<T>): boolean;
}

// User Service
class UserService extends BaseService<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
  
  validate(data: Partial<User>): boolean {
    return !!data.email && !!data.password;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return (this.repository as UserRepository).findByEmail(email);
  }
}
```

## Abstract Classes

```typescript
// Base Controller
abstract class BaseController {
  abstract routes(): Router;
  
  protected success<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date()
    };
  }
  
  protected error(message: string, code: number = 400): ApiResponse<null> {
    return {
      success: false,
      data: null,
      error: { message, code },
      timestamp: new Date()
    };
  }
}

// User Controller
class UserController extends BaseController {
  constructor(private userService: UserService) {}
  
  routes(): Router {
    const router = Router();
    router.post('/register', this.register.bind(this));
    router.post('/login', this.login.bind(this));
    return router;
  }
  
  private async register(req: Request, res: Response): Promise<void> {
    // Implementation
  }
  
  private async login(req: Request, res: Response): Promise<void> {
    // Implementation
  }
}
```

## Static Members

```typescript
// Database Connection Manager
class Database {
  private static instance: Database;
  private static connection: Connection;
  
  private constructor() {}
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  static async connect(config: DatabaseConfig): Promise<void> {
    Database.connection = await createConnection(config);
  }
  
  static getConnection(): Connection {
    return Database.connection;
  }
}
```

## Getters and Setters

```typescript
// Configuration Manager
class ConfigManager {
  private _config: Record<string, any>;
  
  constructor() {
    this._config = {};
  }
  
  get config(): Record<string, any> {
    return { ...this._config };
  }
  
  set config(newConfig: Record<string, any>) {
    this._config = {
      ...this._config,
      ...newConfig
    };
  }
  
  get<T>(key: string): T | undefined {
    return this._config[key];
  }
  
  set<T>(key: string, value: T): void {
    this._config[key] = value;
  }
}
```

## Decorators

```typescript
// Route Decorator
function route(method: HttpMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(req: Request, res: Response) {
      try {
        await originalMethod.apply(this, [req, res]);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    };
  };
}

// Controller with Decorators
class UserController {
  @route('POST', '/users')
  async createUser(req: Request, res: Response): Promise<void> {
    // Implementation
  }
  
  @route('GET', '/users/:id')
  async getUser(req: Request, res: Response): Promise<void> {
    // Implementation
  }
}
```

## Advanced Class Patterns

1. **Repository Pattern**
```typescript
abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected model: Model<T>) {}
  
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
  
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return this.model.create(data);
  }
  
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
```

2. **Service Pattern**
```typescript
class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}
  
  async register(userData: UserRegistration): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(userData.password);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }
  
  async login(credentials: LoginCredentials): Promise<AuthToken> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new Error('User not found');
    
    const isValid = await this.authService.verifyPassword(
      credentials.password,
      user.password
    );
    
    if (!isValid) throw new Error('Invalid password');
    
    return this.authService.generateToken(user);
  }
}
```

3. **Middleware Pattern**
```typescript
class AuthMiddleware {
  constructor(private authService: AuthService) {}
  
  authenticate(): Middleware {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      try {
        const user = await this.authService.verifyToken(token);
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
      }
    };
  }
  
  authorize(roles: string[]): Middleware {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      
      next();
    };
  }
}
```

## Advanced Best Practices

1. **Class Design**
   - Use proper inheritance for shared functionality
   - Consider composition for complex features
   - Use proper abstraction for database operations
   - Follow SOLID principles

2. **Type Safety**
   - Use proper access modifiers
   - Validate input parameters
   - Handle errors properly
   - Use proper type guards

3. **Performance**
   - Avoid unnecessary object creation
   - Use proper memory management
   - Consider using static methods
   - Use proper caching

## Common Pitfalls

1. **Inheritance Issues**
```typescript
// Bad
class DatabaseService {
  constructor(public connection: Connection) {}
  
  query() {
    // Implementation
  }
  
  transaction() {
    // Implementation
  }
  
  cache() {
    // Implementation
  }
}

// Good
class DatabaseService {
  constructor(protected connection: Connection) {}
  
  query() {
    // Implementation
  }
}

class TransactionalDatabaseService extends DatabaseService {
  transaction() {
    // Implementation
  }
}

class CachedDatabaseService extends DatabaseService {
  cache() {
    // Implementation
  }
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
  private _password: string;
  
  get password(): string {
    return this._password;
  }
  
  set password(newPassword: string) {
    // Add validation
    this._password = newPassword;
  }
}
```

## Mixins

```typescript
// Disposable Mixin
class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}

// Activatable Mixin
class Activatable {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}

class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
  }

  // Disposable
  isDisposed: boolean = false;
  dispose: () => void;
  
  // Activatable
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}

applyMixins(SmartObject, [Disposable, Activatable]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
```

## Parameter Properties

```typescript
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}

const octopus = new Octopus('Man with the 8 strong legs');
console.log(octopus.name);
```

## Advanced Decorators

```typescript
// Class Decorator
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
  greet() {
    return "Hello, " + this.greeting;
  }
}

// Method Decorator
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  @enumerable(false)
  greet() {
    return "Hello";
  }
}
```

## Class Expressions

```typescript
const MyClass = class<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
};

const instance = new MyClass<string>("Hello");
```

## Private Fields

```typescript
class Person {
  #name: string;
  #age: number;

  constructor(name: string, age: number) {
    this.#name = name;
    this.#age = age;
  }

  get name(): string {
    return this.#name;
  }

  set name(newName: string) {
    this.#name = newName;
  }
}
``` 