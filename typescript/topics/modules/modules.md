# Modules in TypeScript

## Module Syntax

TypeScript supports two module systems:

- ES Modules (ESM)
- CommonJS (CJS)

### ES Modules

```typescript
// Export
export const name = "TypeScript";
export function greet() {
  return "Hello";
}
export class User {}
export { name as fullName };

// Import
import { name, greet, User } from "./module";
import * as Module from "./module";
import { name as fullName } from "./module";
```

### CommonJS

```typescript
// Export
exports.name = "TypeScript";
module.exports = { name: "TypeScript" };

// Import
const { name } = require("./module");
```

## Import/Export

### Named Exports

```typescript
// Export multiple items
export const name = "TypeScript";
export function greet() {
  return "Hello";
}

// Import specific items
import { name, greet } from "./module";
```

### Default Exports

```typescript
// Export default
export default class User {}

// Import default
import User from "./module";
```

### Re-exporting

```typescript
// Re-export everything
export * from "./module";

// Re-export specific items
export { name, greet } from "./module";

// Re-export with renaming
export { name as fullName } from "./module";
```

## Module Resolution

TypeScript uses two strategies for module resolution:

1. Classic (TypeScript's own)
2. Node (mimics Node.js)

### Path Resolution

```typescript
// Relative paths
import { User } from "./user";
import { Config } from "../config";

// Non-relative paths
import { Component } from "react";
import { User } from "@app/models";
```

### Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"],
      "@models/*": ["src/models/*"]
    }
  }
}
```

## Module Organization

### Barrel Files

```typescript
// index.ts
export * from "./user";
export * from "./product";
export * from "./order";
```

### Circular Dependencies

```typescript
// Avoid circular dependencies by:
// 1. Using barrel files
// 2. Moving shared code to a separate module
// 3. Using dynamic imports
```

## Best Practices

1. Use ES Modules when possible
2. Prefer named exports over default exports
3. Use barrel files for cleaner imports
4. Avoid circular dependencies
5. Use path aliases for better organization
6. Keep modules focused and small
7. Use proper file extensions (.ts, .tsx)
8. Document public APIs with JSDoc
9. Use consistent naming conventions
10. Handle module resolution in tsconfig.json

## Common Patterns

### Dynamic Imports

```typescript
// Lazy loading
const module = await import("./module");
```

### Module Augmentation

```typescript
// Extend existing module
declare module "existing-module" {
  export interface ExtendedInterface {
    newMethod(): void;
  }
}
```

### Namespace Imports

```typescript
// Import everything
import * as React from "react";
```

## Module System Configuration

### tsconfig.json Settings

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Important Compiler Options

- `module`: Specifies the module system
- `moduleResolution`: How to resolve modules
- `baseUrl`: Base directory for non-relative imports
- `paths`: Path mapping for imports
- `esModuleInterop`: Better interoperability between CommonJS and ES Modules
- `allowSyntheticDefaultImports`: Allow default imports from modules without default exports
