"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Quiz, Question } from "../../client";
import QuizDetailsTable from "../quizComponents/QuizDetailsTable";
import QuizTaker from "../quizComponents/Quiz";

type AllAnswers = Record<string, string | Record<string, string>>;

export default function QuizStudentView() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AllAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [attemptLocked, setAttemptLocked] = useState(false);
  const [started, setStarted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    client.findQuizById(qid as string).then((q) => {
      setQuiz(q);
      client
        .findQuizAttempt(qid as string)
        .then((data) => {
          if (data) {
            const count = data.attemptCount ?? 1;
            setAttemptCount(count);
            const restored: AllAnswers = {};
            Object.entries(data.answers).forEach(([qId, answer]) => {
              try {
                const parsed = JSON.parse(answer as string);
                restored[qId] =
                  typeof parsed === "object" ? parsed : (answer as string);
              } catch {
                restored[qId] = answer as string;
              }
            });
            setAnswers(restored);
            setScore(data.score);
            setSubmitted(true);
            const maxAttempts = q.multipleAttempts ? q.howManyAttempts : 1;
            if (count >= maxAttempts) setAttemptLocked(true);
          }
        })
        .catch(() => {});
    });
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const questions = (quiz.questions ?? []) as Question[];
  const now = new Date();
  const availableFrom = new Date(quiz.availableFrom);
  const availableUntil = new Date(quiz.availableUntil);
  const isAvailable = now >= availableFrom && now <= availableUntil;

  const handleSimpleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleBlankAnswer = (
    questionId: string,
    blankId: string,
    value: string,
  ) => {
    if (submitted) return;
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

  const handleSubmit = async () => {
    const finalScore = questions.reduce(
      (total, q) => (isCorrect(q) ? total + q.points : total),
      0,
    );
    setScore(finalScore);
    setSubmitted(true);
    const newCount = attemptCount + 1;
    setAttemptCount(newCount);
    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    if (newCount >= maxAttempts) setAttemptLocked(true);
    const flatAnswers: Record<string, string> = {};
    Object.entries(answers).forEach(([qId, answer]) => {
      flatAnswers[qId] =
        typeof answer === "string" ? answer : JSON.stringify(answer);
    });
    await client.saveQuizAttempt(qid as string, flatAnswers, finalScore);
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

  // Details screen before starting
  if (!started && !submitted) {
    return (
      <QuizDetailsTable
        quiz={quiz}
        actions={
          !isAvailable ? (
            <div className="alert alert-warning mb-0">
              {now < availableFrom
                ? `Not available until ${availableFrom.toLocaleDateString()}`
                : "This quiz is closed."}
            </div>
          ) : (
            <button className="btn btn-danger" onClick={() => setStarted(true)}>
              Start Quiz
            </button>
          )
        }
      />
    );
  }

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && <p>{quiz.description}</p>}
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
              Your Score: {score} / {quiz.points}
            </strong>
            <div className="mt-2 small text-muted">
              Attempt {attemptCount} of{" "}
              {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
            </div>
            {!attemptLocked && quiz.multipleAttempts && (
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setStarted(true);
                  setScore(0);
                }}
              >
                Retake Quiz
              </button>
            )}
            {attemptLocked && (
              <div className="text-danger mt-2 small">
                You have used all your attempts for this quiz.
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
