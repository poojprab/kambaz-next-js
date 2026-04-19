"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";
import { Quiz, Question } from "../../../client";
import QuizTaker from "../../quizComponents/Quiz";

type AllAnswers = Record<string, string | Record<string, string>>;

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AllAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    client.findQuizById(qid as string).then(setQuiz);
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  if (!quiz.questions || quiz.questions.length === 0)
    return (
      <div id="wd-quiz-preview" className="p-4">
        <div className="alert alert-warning">
          This is a preview of the published version of the quiz.
        </div>
        <h2>{quiz.title}</h2>
        <hr />
        <div className="alert alert-info">This quiz has no questions yet.</div>
        <button
          className="btn btn-secondary mt-3"
          onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/faculty/edit`)
          }
        >
          Add Questions
        </button>
      </div>
    );

  const questions = quiz.questions as Question[];

  const handleSimpleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleBlankAnswer = (
    questionId: string,
    blankId: string,
    value: string,
  ) => {
    const existing = (answers[questionId] as Record<string, string>) ?? {};
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { ...existing, [blankId]: value },
    }));
  };

  const isCorrect = (q: Question): boolean => {
    if (q.type === "multiple_choice") {
      const correct = q.choices.find((c) => c.isCorrect);
      return correct ? answers[q._id] === correct._id : false;
    }
    if (q.type === "true_false") return answers[q._id] === q.correctAnswer;
    if (q.type === "fill_in_blank") {
      const blanks = q.blanks ?? [];
      if (blanks.length === 0) {
        return q.possibleAnswers
          .map((a) => a.toLowerCase())
          .includes((answers[q._id] as string)?.toLowerCase());
      }
      const blankAnswers = (answers[q._id] as Record<string, string>) ?? {};
      return blanks.every((blank) => {
        const given = blankAnswers[blank._id]?.toLowerCase().trim() ?? "";
        return blank.correctAnswers
          .map((a) => a.toLowerCase().trim())
          .includes(given);
      });
    }
    return false;
  };

  const handleSubmit = () => {
    setScore(
      questions.reduce(
        (total, q) => (isCorrect(q) ? total + q.points : total),
        0,
      ),
    );
    setSubmitted(true);
  };

  const handleSearch = () => {
    const match = questions.find(
      (q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (match) {
      setCurrentIndex(questions.findIndex((q) => q._id === match._id));
    }
  };

  return (
    <div id="wd-quiz-preview" className="p-4">
      <div className="alert alert-warning">
        This is a preview of the published version of the quiz.
      </div>
      <h2>{quiz.title}</h2>
      <hr />
      <QuizTaker
        quiz={quiz}
        answers={answers}
        submitted={submitted}
        currentIndex={currentIndex}
        searchTerm={searchTerm}
        onSimpleAnswer={handleSimpleAnswer}
        onBlankAnswer={handleBlankAnswer}
        onSubmit={handleSubmit}
        onNavigate={setCurrentIndex}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
        isCorrect={isCorrect}
        afterSubmitContent={
          <div className="alert alert-info mb-4">
            <strong>
              Score: {score} / {quiz.points}
            </strong>
            <div className="mt-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  router.push(`/courses/${cid}/quizzes/${qid}/faculty/edit`)
                }
              >
                Keep Editing This Quiz
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
