import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },

  setTodo: (todo) => set({ todo }),

  addTodo: () => {
    const { todos, todo } = get();
    const newTodo = { ...todo, id: new Date().getTime().toString() };
    set({ todos: [...todos, newTodo], todo: { id: "-1", title: "" } });
  },

  deleteTodo: (id) => {
    const { todos } = get();
    set({ todos: todos.filter((t) => t.id !== id) });
  },

  updateTodo: () => {
    const { todos, todo } = get();
    set({
      todos: todos.map((t) => (t.id === todo.id ? todo : t)),
      todo: { id: "-1", title: "" },
    });
  },
}));