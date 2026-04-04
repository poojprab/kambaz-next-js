import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export const signin = async (credentials: Credentials): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(
    `${USERS_API}/signin`,
    credentials,
  );
  return response.data;
};

export const signup = async (user: Omit<User, "_id">): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(
    `${USERS_API}/signup`,
    user,
  );
  return response.data;
};

export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const profile = async (): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(
    `${USERS_API}/profile`,
  );
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user,
  );
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: Partial<User>) => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data;
};
