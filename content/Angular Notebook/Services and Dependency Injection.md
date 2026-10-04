---
title: Services and Dependency Injection
tags:
  - Angular
---

Most of our logic is implemented in services.

- **Service:** a TypeScript class containing reusable code (business logic) that can be shared across multiple components.
- **Dependency injection:** a mechanism to inject services into components, directives or other services.
- Create a service: `ng g s servicename`

## Without DI (not preferred)

Create the service manually inside a component: `const service = new MyService();`

## With DI

A design pattern where Angular automatically provides/injects the required services instead of you creating them manually.

```ts
constructor(private salaryService: SalaryService) {
  this.finalSalary = this.salaryService.calculateSalary(this.base, this.bonus);
}
```

## Why DI over manual?

Disadvantages of `new`:

- can create multiple service instances
- creates tight coupling between services & components
- makes testing more difficult
