import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  published: boolean;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  questions: object[];
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
}

export const findQuizzesForCourse = async (
  courseId: string,
): Promise<Quiz[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`,
  );
  return data;
};

export const createQuiz = async (
  courseId: string,
  quiz: Partial<Quiz>,
): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz,
  );
  return data;
};

export const updateQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz,
  );
  return data;
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};
