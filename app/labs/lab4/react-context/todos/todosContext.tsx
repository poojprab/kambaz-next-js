"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
  id: string;
  title: string;
}

interface TodosContextState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

  const addTodo = () => {
    const newTodo = { ...todo, id: new Date().getTime().toString() };
    setTodos([...todos, newTodo]);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = () => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  return (
    <TodosContext.Provider value={{ todos, todo, setTodo, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};