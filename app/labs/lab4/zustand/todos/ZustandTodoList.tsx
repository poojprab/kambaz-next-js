"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodoStore(
    (state) => state,
  );

  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List (Zustand)</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-add-todo-click" style={{ backgroundColor: "#1e731f", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Add </Button>
          <Button onClick={updateTodo} id="wd-update-todo-click" style={{ backgroundColor: "#ffc919", color: "black", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Update </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click" style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Delete </Button>
            <Button onClick={() => setTodo(t)} id="wd-set-todo-click" style={{ backgroundColor: "#008cff", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Edit </Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}