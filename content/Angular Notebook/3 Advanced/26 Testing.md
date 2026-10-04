---
title: 26. Testing
tags:
  - Angular
  - testing
---

## Types of tests

| Type | Tests | Tools |
| --- | --- | --- |
| **Unit** | one class/function/component in isolation | **Vitest** (default since v21), Jasmine + Karma (older projects), Jest |
| **Integration** | a component with its template and children | `TestBed` |
| **E2E** | the whole app in a real browser, like a user | Playwright, Cypress (Protractor is dead) |

`ng test` runs unit tests; spec files sit next to the code (`user.service.spec.ts`).

## Basic structure

```ts
describe('Calculator', () => {
  beforeEach(() => { /* setup */ });

  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

Arrange → Act → Assert.

## Testing a service

```ts
describe('SalaryService', () => {
  let service: SalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryService);
  });

  it('adds base and bonus', () => {
    expect(service.calculateSalary(30000, 5000)).toBe(35000);
  });
});
```

## Testing a component

```ts
describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Counter] }).compileComponents();
    fixture = TestBed.createComponent(Counter);
    fixture.detectChanges();                                    // render
  });

  it('increments on click', () => {
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('1');
  });

  it('accepts an input', () => {
    fixture.componentRef.setInput('start', 10);
    fixture.detectChanges();
    expect(fixture.componentInstance.count()).toBe(10);
  });
});
```

- **`TestBed`**: Angular's testing module, sets up DI and compiles components.
- **`ComponentFixture`**: wrapper around the created component (`componentInstance`, `nativeElement`, `detectChanges()`).

## Mocking dependencies

Replace real services so tests are fast and isolated:

```ts
const mockUserService = { getUsers: () => of([{ id: 1, name: 'Ana' }]) };

TestBed.configureTestingModule({
  imports: [UserList],
  providers: [{ provide: UserService, useValue: mockUserService }],
});
```

This is the DI testability benefit from [[10 Services and Dependency Injection|Services and DI]].

## Testing HTTP

```ts
TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
const http = TestBed.inject(HttpTestingController);

service.getUsers().subscribe((users) => expect(users.length).toBe(1));
http.expectOne('https://jsonplaceholder.typicode.com/users').flush([{ id: 1 }]);
http.verify();   // no unexpected requests
```

Async helpers: `fakeAsync` + `tick()` to fast-forward timers; `await fixture.whenStable()`.
