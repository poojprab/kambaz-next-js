"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos()!;

  return (
    <div id="wd-react-context-todo-list">
      <h2>Todo List (Context)</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-add-todo-click"> Add </Button>
          <Button onClick={updateTodo} id="wd-update-todo-click"> Update </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click"> Delete </Button>
            <Button onClick={() => setTodo(t)} id="wd-set-todo-click"> Edit </Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}