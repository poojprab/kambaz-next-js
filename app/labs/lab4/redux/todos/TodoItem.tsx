import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: {id: string, title: string} }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click" style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click" style={{ backgroundColor: "#008cff", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", margin: "5px" }}> Edit </Button>
      {todo.title}
    </ListGroupItem>
  );
}