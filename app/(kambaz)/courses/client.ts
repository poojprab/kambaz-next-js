import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`,
  );
  return data;
};

export const createCourse = async (course: object) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course,
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: {
  _id: string;
  [key: string]: unknown;
}) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course,
  );
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModule = async (courseId: string, module: object) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  await axiosWithCredentials.delete(`${HTTP_SERVER}/api/modules/${moduleId}`);
};

export const updateModule = async (module: {
  _id: string;
  [key: string]: unknown;
}) => {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const { data } = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/modules/${module._id}`,
    module,
  );
  return data;
};
