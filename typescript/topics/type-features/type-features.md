# TypeScript Language Features

## Basic Types [Core]

### Union Types

```typescript
type Status = "active" | "inactive" | "pending";
type ID = string | number;

function processStatus(status: Status): void {
  // Type narrowing
  if (status === "active") {
    // ...
  }
}
```

### Intersection Types

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30,
};
```

## Advanced Types [Advanced]

### Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Conditional Types

```typescript
type ExtractType<T> = T extends (infer U)[] ? U : never;
type NonNullable<T> = T extends null | undefined ? never : T;

type ArrayType = ExtractType<string[]>; // string
type NonNullString = NonNullable<string | null>; // string
```

## Type System Patterns [Advanced]

### Discriminated Unions

```typescript
interface Success<T> {
  type: "success";
  data: T;
}

interface Error {
  type: "error";
  message: string;
}

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>): void {
  switch (result.type) {
    case "success":
      console.log(result.data);
      break;
    case "error":
      console.error(result.message);
      break;
  }
}
```

### Branded Types

```typescript
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}
```

## Type Manipulation [Mastery]

### Recursive Types

```typescript
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const json: JsonValue = {
  name: "John",
  age: 30,
  tags: ["typescript", "javascript"],
  metadata: {
    active: true,
  },
};
```

### Template Literal Types

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `/${string}`;
type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;

const route: ApiRoute = "GET /users";
```

## Interview Focus Areas

### Core Knowledge

- Basic type features
- Union/Intersection types
- Type guards
- Type inference

### Common Interview Questions

- How do you use generics?
- How do you handle type narrowing?
- How do you use mapped types?
- How do you implement type safety?

### Advanced Topics

- Conditional types
- Discriminated unions
- Branded types
- Type manipulation

### Mastery Level

- Recursive types
- Template literal types
- Complex type patterns
- Type system design
