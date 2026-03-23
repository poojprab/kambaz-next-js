"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const [todoId, setTodoId] = useState("1");
  const [deleteTodoId, setDeleteTodoId] = useState("1");
  const [updateTodo, setUpdateTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
  });
  const [completedTodo, setCompletedTodo] = useState({
    id: "1",
    completed: false,
  });
  const [descriptionTodo, setDescriptionTodo] = useState({
    id: "1",
    description: "New Description",
  });
  const API = `${HTTP_SERVER}/lab5/todos`;
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todoId}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        defaultValue={todoId}
        className="w-50"
        onChange={(e) => setTodoId(e.target.value)}
      />
      <hr />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h4>Creating New Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />
      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${deleteTodoId}/delete`}
      >
        Remove Todo with ID = {deleteTodoId}
      </a>
      <FormControl
        defaultValue={deleteTodoId}
        className="w-50"
        onChange={(e) => setDeleteTodoId(e.target.value)}
      />
      <hr />
      <h4>Updating an Item in an Array</h4>
      <a
        href={`${API}/${updateTodo.id}/title/${updateTodo.title}`}
        className="btn btn-primary float-end"
      >
        Update Todo
      </a>
      <FormControl
        defaultValue={updateTodo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setUpdateTodo({ ...updateTodo, id: e.target.value })}
      />
      <FormControl
        defaultValue={updateTodo.title}
        className="w-50 float-start"
        onChange={(e) =>
          setUpdateTodo({ ...updateTodo, title: e.target.value })
        }
      />
      <br />
      <br />
      <hr />
      <h4>Updating Completed</h4>
      <a
        href={`${API}/${completedTodo.id}/completed/${completedTodo.completed}`}
        className="btn btn-primary float-end"
      >
        Complete Todo ID = {completedTodo.id}
      </a>
      <FormControl
        defaultValue={completedTodo.id}
        className="w-25 float-start me-2"
        onChange={(e) =>
          setCompletedTodo({ ...completedTodo, id: e.target.value })
        }
      />
      <input
        type="checkbox"
        className="float-start mt-2"
        defaultChecked={completedTodo.completed}
        onChange={(e) =>
          setCompletedTodo({ ...completedTodo, completed: e.target.checked })
        }
      />
      <br />
      <br />
      <hr />
      <h4>Updating Description</h4>
      <a
        href={`${API}/${descriptionTodo.id}/description/${descriptionTodo.description}`}
        className="btn btn-primary float-end"
      >
        Describe Todo ID = {descriptionTodo.id}
      </a>
      <FormControl
        defaultValue={descriptionTodo.id}
        className="w-25 float-start me-2"
        onChange={(e) =>
          setDescriptionTodo({ ...descriptionTodo, id: e.target.value })
        }
      />
      <FormControl
        defaultValue={descriptionTodo.description}
        className="w-50 float-start"
        onChange={(e) =>
          setDescriptionTodo({
            ...descriptionTodo,
            description: e.target.value,
          })
        }
      />
      <br />
      <br />
      <hr />
    </div>
  );
}
