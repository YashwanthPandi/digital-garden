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

You can also assert **how** the request was made:

```ts
const req = http.expectOne('/postUrl');
expect(req.request.method).toBe('POST');
expect(req.request.headers.get('Content-Type')).toBe('application/json');
expect(req.request.body).toEqual({ title: 'Hello' });
req.flush({ ok: true });
```

> [!note] Old `Http` tests used `MockBackend` and `MockConnection` from `@angular/http/testing` (`backend.connections.subscribe(c => c.mockRespond(new Response(…)))`). `HttpTestingController` replaced them.

## Testing a pipe

A pipe is a plain class, so you don't even need TestBed:

```ts
describe('ReversePipe', () => {
  const pipe = new ReversePipe();

  it('reverses a string', () => {
    expect(pipe.transform('abc')).toBe('cba');
  });
});
```

(Use TestBed only if the pipe injects something.)

## Testing a directive

Create a tiny **host component** in the spec that uses the directive, then fire events at its elements:

```ts
@Component({
  imports: [HighlightDirective],
  template: `
    <span id="default" appHighlight>red</span>
    <span id="green" appHighlight="green">green</span>
  `,
})
class Host {}

describe('HighlightDirective', () => {
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('uses the given colour on mouseenter', () => {
    const span = el.querySelector<HTMLElement>('#green')!;
    span.dispatchEvent(new MouseEvent('mouseenter'));
    expect(span.style.backgroundColor).toBe('green');
  });

  it('clears the colour on mouseleave', () => {
    const span = el.querySelector<HTMLElement>('#default')!;
    span.dispatchEvent(new MouseEvent('mouseenter'));
    span.dispatchEvent(new MouseEvent('mouseleave'));
    expect(span.style.backgroundColor).toBe('');
  });
});
```

## Testing forms

**Reactive forms** are synchronous, so test the model directly:

```ts
it('requires a name', () => {
  component.form.controls.name.setValue('');
  expect(component.form.invalid).toBe(true);
});

it('logs the name on submit', () => {
  const log = spyOn(console, 'log');                    // Vitest: vi.spyOn(console, 'log')
  component.form.controls.name.setValue('Saitama');
  fixture.nativeElement.querySelector('button[type=submit]').click();
  expect(log).toHaveBeenCalledWith('Saitama');
});
```

**Template-driven forms (`ngModel`)** update **asynchronously**, so type into the input, fire the `input` event, and wait:

```ts
it('updates the model when the user types', async () => {
  const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
  input.value = 'Username';
  input.dispatchEvent(new Event('input'));
  await fixture.whenStable();
  expect(component.username).toBe('Username');
});
```

## Mocking an NgRx store

Don't run real reducers and effects in a component test. `provideMockStore` gives you a store you control:

```ts
let store: MockStore;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [LoginPage],
    providers: [provideMockStore({ initialState: { user: { username: null, isConnected: false } } })],
  });
  store = TestBed.inject(MockStore);
});

it('dispatches login', () => {
  const dispatch = spyOn(store, 'dispatch');
  // …click the login button…
  expect(dispatch).toHaveBeenCalledWith(login({ username: 'ana' }));
});

it('shows the user', () => {
  store.setState({ user: { username: 'ana', isConnected: true } });   // or store.overrideSelector(selectUser, …)
  store.refreshState();
  fixture.detectChanges();
  // …assert the template…
});
```

(Before `@ngrx/store/testing` existed, people wrote their own `MockStore` class with fake `dispatch` / `select` and swapped it in with `{ provide: Store, useClass: MockStore }`. Same idea.)

## Code coverage

**Coverage** = how much of your code actually runs during the tests. It shows what's untested; it doesn't prove the tests check the right things.

```bash
ng test --code-coverage     # Karma / Jasmine projects (writes coverage/<app>/index.html)
ng test --coverage          # Vitest projects
```

Open `coverage/…/index.html` for a per-folder, per-file report (green = covered, red = not):

![[coverage-report.jpg]]

Four numbers to know:

| Metric | Counts |
| --- | --- |
| Statements | each executed statement |
| Branches | each side of every `if` / `?:` / `&&` |
| Functions | each function called at least once |
| Lines | each executed line |

You can make the build **fail** below a minimum. In a Karma project, in `karma.conf.js`:

```js
coverageReporter: {
  reporters: [{ type: 'html' }, { type: 'text-summary' }],
  check: { global: { statements: 90, branches: 90, functions: 90, lines: 90 } },
},
```

Then a test run below the target ends with errors like these (here: 65% statements against a 90% threshold):

![[coverage-threshold-terminal.jpg]]

Vitest has the same idea (coverage thresholds in its config). Don't chase 100%: 70–80% of meaningful code with good assertions beats 100% of trivial getters.

## E2E testing

End-to-end tests drive a real browser through the running app: click the navbar link, check the URL changed, check the page text.

```ts
// Playwright
test('navbar goes to the list page', async ({ page }) => {
  await page.goto('/home');
  await expect(page.getByRole('link', { name: 'List' })).toBeVisible();
  await page.getByRole('link', { name: 'List' }).click();
  await expect(page).toHaveURL(/\/list/);
});
```

> [!note] Protractor
> Angular's original E2E tool was **Protractor** (`protractor.conf.js`, `element(by.id('home-navbar'))`, `browser.get()`, `webdriver-manager`). It reached end of life in 2023; `ng e2e` now asks you to choose Playwright, Cypress, WebdriverIO or similar. Expect to migrate Protractor suites in old projects.

## Debugging tests and the app in VS Code

- **App:** run `ng serve`, then in VS Code use **Run and Debug → "Launch Chrome against localhost"** (or the `launch.json` the CLI generates). Breakpoints in `.ts` files work thanks to source maps.
- **Tests:** add `debugger;` in a spec, run `ng test`, and open the browser DevTools of the test runner, or use the Vitest / Jasmine VS Code extensions to run a single test with breakpoints.
- Old guides set `launch.json` to `"type": "node"` with `program: app/main.js`. That debugs Node, not the browser app, so it doesn't help for Angular code.
