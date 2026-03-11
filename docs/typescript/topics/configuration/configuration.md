# TypeScript Configuration

## Basic Configuration [Core]

### tsconfig.json Basics [Core]

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Common Options [Core]

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true
  }
}
```

## Module Configuration [Common]

### Module Resolution [Common]

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Module Systems [Common]

```json
{
  "compilerOptions": {
    "module": "esnext",
    "lib": ["esnext", "dom"],
    "allowJs": true,
    "checkJs": true
  }
}
```

## Type Checking [Common]

### Strict Mode [Common]

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### Type Checking Options [Common]

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## Advanced Configuration [Advanced]

### Project References [Advanced]

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [{ "path": "../shared" }, { "path": "../utils" }]
}
```

### Custom Type Definitions [Advanced]

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./node_modules/@types"],
    "types": ["node", "jest"]
  }
}
```

## Best Practices [Core]

1. Use strict mode by default
2. Configure proper module resolution
3. Set appropriate target and module
4. Enable source maps for debugging
5. Configure proper output directory
6. Use path aliases [Common]
7. Configure proper lib options [Common]
8. Enable strict type checking
9. Configure proper declaration files
10. Use project references [Advanced]

## Common Patterns [Common]

### Development Configuration [Common]

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Production Configuration [Common]

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Interview Focus Areas

### Core Knowledge [Core]

- Basic tsconfig.json structure
- Common compiler options
- Module configuration
- Basic type checking options
- Source map configuration

### Common Interview Questions [Common]

- What are the key compiler options in TypeScript?
- How do you configure module resolution?
- What is strict mode and why is it important?
- How do you handle type definitions?

### Advanced Topics [Advanced]

- Project references
- Custom type definitions
- Advanced module resolution
- Complex build configurations

### Mastery Level [Mastery]

- Advanced build optimization
- Custom compiler plugins
- Complex project structures
- Performance tuning
