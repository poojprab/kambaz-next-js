import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`,
  );
  return data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string,
) => {
  await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`,
  );
};
export const getEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/${userId}/enrollments`,
  );
  return data;
};
