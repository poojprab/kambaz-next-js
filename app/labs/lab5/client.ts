import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const LAB5_API = `${HTTP_SERVER}/lab5`;

export const fetchTodos = async () => {
  const { data } = await axios.get(`${LAB5_API}/todos`);
  return data;
};

export const createNewTodo = async () => {
  const { data } = await axios.get(`${LAB5_API}/todos/create`);
  return data;
};

export const postNewTodo = async (todo: object) => {
  const { data } = await axios.post(`${LAB5_API}/todos`, todo);
  return data;
};

export const removeTodo = async (todo: { id: number }) => {
  const { data } = await axios.get(`${LAB5_API}/todos/${todo.id}/delete`);
  return data;
};

export const deleteTodo = async (todo: { id: number }) => {
  await axios.delete(`${LAB5_API}/todos/${todo.id}`);
};

export const updateTodo = async (todo: {
  id: number;
  [key: string]: unknown;
}) => {
  await axios.put(`${LAB5_API}/todos/${todo.id}`, todo);
};

export const fetchAssignment = async () => {
  const { data } = await axios.get(`${LAB5_API}/assignment`);
  return data;
};

export const updateTitle = async (title: string) => {
  const { data } = await axios.get(`${LAB5_API}/assignment/title/${title}`);
  return data;
};

export const fetchWelcomeMessage = async () => {
  const { data } = await axios.get(`${LAB5_API}/welcome`);
  return data;
};
