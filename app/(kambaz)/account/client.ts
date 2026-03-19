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

export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.put<User>(
    `${USERS_API}/${user._id}`,
    user,
  );
  return response.data;
};
