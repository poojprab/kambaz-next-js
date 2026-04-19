import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// Interface for quiz choices (multiple choice and true false questions)
export interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

// Interface for blanks in fill in the blank questions, which can have multiple correct answers
export interface Blank {
  _id: string;
  correctAnswers: string[];
}

// Interface for quiz questions, which can be multiple choice, true false, or fill in the blank
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

// Interface for quizzes, which contain an array of questions and various settings
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

// Interface for question groups, which allow grouping questions together
export interface QuestionGroup {
  _id: string;
  name: string;
  pickCount: number;
  questionIds: string[];
}

// find Quizzes for a course, used on quiz list page
export const findQuizzesForCourse = async (
  courseId: string,
): Promise<Quiz[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`,
  );
  return data;
};

// Create a quiz and redirect to quiz edit page, used on quiz list page when instructor clicks "Create Quiz"
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

// Update quiz details, used on quiz edit page when instructor clicks "Save"
export const updateQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz,
  );
  return data;
};

// Delete a quiz, used on quiz edit page when instructor clicks "Delete"
export const deleteQuiz = async (quizId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

// Find quiz details by quiz ID, used on quiz details page for both students and faculty, and on quiz edit page to load quiz details
export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

// Save a student's quiz attempt, used on quiz student page when student submits their answers
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

// Find a student's quiz attempt for a given quiz, used on quiz student page on mount to restore any existing attempt and show attempt count
export const findQuizAttempt = async (
  quizId: string,
): Promise<{
  answers: Record<string, string>;
  score: number;
  attemptCount: number;
} | null> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts`,
  );
  return data;
};
