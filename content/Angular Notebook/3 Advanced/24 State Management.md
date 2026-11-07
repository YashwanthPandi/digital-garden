---
title: 24. State Management
tags:
  - Angular
---

**State** = data the UI depends on (logged-in user, cart, filters, loaded lists). The question is where it lives and how components share it.

| Level | Where | Use when |
| --- | --- | --- |
| Local | fields / signals in a component | only one component cares |
| Shared | **service with signals** or `BehaviorSubject` | a few components share it (most apps) |
| URL | route & query params | state should survive refresh / be shareable (filters, page) |
| Global store | **NgRx** (Store or SignalStore) | large apps, many teams, complex flows, need devtools/time-travel |

## Service with signals (start here)

```ts
@Injectable({ providedIn: 'root' })
export class TodoStore {
  private todos = signal<Todo[]>([]);
  readonly all = this.todos.asReadonly();
  readonly remaining = computed(() => this.todos().filter((t) => !t.done).length);

  add(title: string) { this.todos.update((l) => [...l, { id: Date.now(), title, done: false }]); }
  toggle(id: number) { this.todos.update((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); }
}
```

Rules: keep the writable state **private**, expose read-only signals, change it only through methods, update immutably. Older equivalent: a private `BehaviorSubject` + public `asObservable()` (see [[13 Observables and RxJS#Subjects|Subjects]]).

## NgRx Store (Redux pattern)

One global immutable state object, changed only by dispatching actions.

```
Component --dispatch(action)--> Reducer --new state--> Store --select--> Component
                     \--> Effect (API call) --dispatch(success/failure action)--/
```

| Piece | Role |
| --- | --- |
| **Store** | single source of truth |
| **Action** | event describing what happened: `[Todos] Add` |
| **Reducer** | pure function `(state, action) => newState` |
| **Selector** | memoized function to read a slice of state |
| **Effect** | side effects (HTTP) triggered by actions, dispatch new actions |

```ts
export const addTodo = createAction('[Todos] Add', props<{ title: string }>());

export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, { title }) => ({ ...state, todos: [...state.todos, { title, done: false }] })),
);

export const selectTodos = (s: AppState) => s.todos;

// component
store = inject(Store);
todos = this.store.selectSignal(selectTodos);
add() { this.store.dispatch(addTodo({ title: 'Learn NgRx' })); }
```

Pros: predictable, debuggable (Redux DevTools, time travel), scales across teams. Cons: lots of boilerplate; overkill for small apps.

### Worked example: logging a user in

The user's state, and the actions that change it. The login takes time, so it goes through several states:

```ts
export interface UserState {
  username: string | null;
  isConnecting: boolean;   // UI only: disable the button while waiting
  isConnected: boolean;
}
const initialState: UserState = { username: null, isConnecting: false, isConnected: false };

export const login = createAction('[User] Login', props<{ username: string }>());
export const loginSuccess = createAction('[User] Login Success', props<{ username: string }>());
export const logout = createAction('[User] Logout');

export const userReducer = createReducer(
  initialState,
  on(login, (s) => ({ ...s, isConnecting: true })),
  on(loginSuccess, (s, { username }) => ({ ...s, username, isConnecting: false, isConnected: true })),
  on(logout, () => initialState),
);
```

The HTTP call lives in an **effect**: it listens for `login`, calls the API, and dispatches `loginSuccess`:

```ts
export const login$ = createEffect(
  (actions$ = inject(Actions), api = inject(AuthApi)) =>
    actions$.pipe(
      ofType(login),
      exhaustMap(({ username }) => api.login(username).pipe(map(() => loginSuccess({ username })))),
    ),
  { functional: true },
);
```

Registering it (`app.config.ts`): `provideStore({ user: userReducer })`, `provideEffects({ login$ })`, plus `provideStoreDevtools()` for the Redux DevTools browser extension.

Notice the reducer never mutates: every case returns a **new** object (`{ ...s, … }`), which is what makes OnPush and time-travel debugging work. (Old code used `Object.assign({}, state, changes)` for the same thing.)

### Smart and presentational components

A pattern that pairs well with any store:

- **Smart (container) components** inject the store/services, select data, dispatch actions. Usually one per page.
- **Presentational ("dumb") components** only take `@Input`s and emit `@Output`s. No store, no services, so they're easy to reuse and test.

```html
<!-- smart: LoginPage -->
<app-user-card [user]="user()" (logout)="store.dispatch(logout())" />
```

```ts
user = inject(Store).selectSignal(selectUser);
```

> [!note] Old NgRx syntax
> NgRx 2–4 code (2016–2017) looks different: string constants for actions (`USR_IS_CONNECTING`), `switch` statements in reducers, `StoreModule.provideStore({ user: UserReducer })`, `@Effect()` decorators and `actions$.ofType()`. Same ideas, older API. NgRx 8+ uses `createAction`, `createReducer`, `createEffect`. Some teams use plain **Redux** with an `InjectionToken` for the store instead of NgRx; the concepts carry over.

## NgRx SignalStore

Lighter, signal-based store from `@ngrx/signals`:

```ts
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: [] as Todo[], filter: 'all' }),
  withComputed(({ todos }) => ({ remaining: computed(() => todos().filter((t) => !t.done).length) })),
  withMethods((store) => ({
    add(title: string) { patchState(store, { todos: [...store.todos(), { title, done: false }] }); },
  })),
);
```

Interview answer: "Start with services + signals; reach for NgRx when shared state, side effects and team size make explicit actions and devtools worth the boilerplate."
