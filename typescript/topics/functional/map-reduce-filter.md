# Map/Reduce/Filter in TypeScript

## Basic Array Operations

```typescript
const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// 15
```

## Type-Safe Operations

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 20, active: true }
];

// Type-safe map
const userNames: string[] = users.map(user => user.name);

// Type-safe filter
const activeUsers: User[] = users.filter(user => user.active);

// Type-safe reduce
const totalAge: number = users.reduce((sum, user) => sum + user.age, 0);
```

## Chaining Operations

```typescript
const result = users
  .filter(user => user.active)
  .map(user => user.name)
  .reduce((acc, name) => `${acc}, ${name}`, 'Active users:');
// "Active users: John, Bob"
```

## Advanced Patterns

### 1. Grouping
```typescript
type GroupedUsers = Record<string, User[]>;

const groupedByAge = users.reduce<GroupedUsers>((acc, user) => {
  const ageGroup = Math.floor(user.age / 10) * 10;
  const key = `${ageGroup}-${ageGroup + 9}`;
  acc[key] = acc[key] || [];
  acc[key].push(user);
  return acc;
}, {});
```

### 2. Indexing
```typescript
type UserIndex = Record<number, User>;

const userIndex = users.reduce<UserIndex>((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

### 3. Complex Transformations
```typescript
interface UserStats {
  totalUsers: number;
  averageAge: number;
  activeUsers: number;
}

const stats = users.reduce<UserStats>(
  (acc, user) => ({
    totalUsers: acc.totalUsers + 1,
    averageAge: (acc.averageAge * acc.totalUsers + user.age) / (acc.totalUsers + 1),
    activeUsers: acc.activeUsers + (user.active ? 1 : 0)
  }),
  { totalUsers: 0, averageAge: 0, activeUsers: 0 }
);
```

## Best Practices

1. **Type Safety**
   - Always specify return types
   - Use proper type guards
   - Validate input data
   - Handle edge cases

2. **Performance**
   - Avoid unnecessary operations
   - Use proper data structures
   - Consider time complexity
   - Use proper caching

3. **Readability**
   - Use meaningful variable names
   - Keep operations focused
   - Use proper documentation
   - Consider code organization

4. **Maintainability**
   - Group related operations
   - Use proper error handling
   - Consider code reusability
   - Use proper testing

## Common Patterns

1. **Data Transformation**
```typescript
interface RawData {
  id: string;
  value: number;
  timestamp: string;
}

interface ProcessedData {
  id: number;
  value: number;
  date: Date;
}

const processData = (rawData: RawData[]): ProcessedData[] =>
  rawData
    .filter(data => data.value > 0)
    .map(data => ({
      id: parseInt(data.id),
      value: data.value,
      date: new Date(data.timestamp)
    }));
```

2. **Data Aggregation**
```typescript
interface SalesData {
  product: string;
  amount: number;
  date: Date;
}

const aggregateSales = (sales: SalesData[]): Record<string, number> =>
  sales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.amount;
    return acc;
  }, {});
```

3. **Data Validation**
```typescript
interface UserInput {
  name?: string;
  age?: number;
  email?: string;
}

const validateUser = (input: UserInput): boolean =>
  Object.entries(input)
    .filter(([key]) => ['name', 'age', 'email'].includes(key))
    .every(([key, value]) => {
      switch (key) {
        case 'name': return typeof value === 'string' && value.length > 0;
        case 'age': return typeof value === 'number' && value >= 0;
        case 'email': return typeof value === 'string' && value.includes('@');
        default: return false;
      }
    });
```

## Common Pitfalls

1. **Type Safety**
```typescript
// Bad
const process = (data: any[]) => {
  return data.map(item => item.value);
};

// Good
interface Data {
  value: number;
}
const process = (data: Data[]): number[] => {
  return data.map(item => item.value);
};
```

2. **Performance**
```typescript
// Bad
const result = data
  .map(item => expensiveOperation(item))
  .filter(item => item.value > 0)
  .map(item => anotherExpensiveOperation(item));

// Good
const result = data
  .filter(item => item.value > 0)
  .map(item => {
    const processed = expensiveOperation(item);
    return anotherExpensiveOperation(processed);
  });
```

3. **Error Handling**
```typescript
// Bad
const process = (data: number[]) => {
  return data.reduce((acc, curr) => acc + curr);
};

// Good
const process = (data: number[]): number => {
  if (data.length === 0) return 0;
  return data.reduce((acc, curr) => acc + curr);
};
```