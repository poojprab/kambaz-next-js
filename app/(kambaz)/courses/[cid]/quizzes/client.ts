import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface Blank {
  _id: string;
  correctAnswers: string[];
}

export interface Question {
  _id: string;
  title: string;
  type: "multiple_choice" | "true_false" | "fill_in_blank";
  points: number;
  question: string;
  choices: Choice[];
  correctAnswer: string;
  possibleAnswers: string[];
  blanks: Blank[];
}

export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description: string;
  published: boolean;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  questions: Question[];
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
  groups: QuestionGroup[];
}

export interface QuestionGroup {
  _id: string;
  name: string;
  pickCount: number;
  pointsPerQuestion: number;
  questionIds: string[];
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

export const saveQuizAttempt = async (
  quizId: string,
  answers: Record<string, string>,
  score: number,
): Promise<void> => {
  await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, {
    quiz: quizId,
    answers,
    score,
  });
};

export const findQuizAttempt = async (
  quizId: string,
): Promise<{
  answers: Record<string, string>;
  score: number;
} | null> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts`,
  );
  return data;
};
