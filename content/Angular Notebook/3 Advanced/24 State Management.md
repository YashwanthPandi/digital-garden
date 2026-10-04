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
