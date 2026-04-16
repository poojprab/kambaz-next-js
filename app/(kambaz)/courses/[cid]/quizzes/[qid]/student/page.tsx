"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Quiz } from "../../client";

interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Blank {
  _id: string;
  correctAnswers: string[];
}

interface Question {
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

type AllAnswers = Record<string, string | Record<string, string>>;

interface Attempt {
  answers: AllAnswers;
  score: number;
}

export default function TakeQuiz() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<AllAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client.findQuizById(qid as string).then(setQuiz);
    client
      .findQuizAttempt(qid as string)
      .then((data) => {
        if (data) {
          setAttempt(data);
          const restored: AllAnswers = {};
          Object.entries(data.answers).forEach(([qId, answer]) => {
            try {
              const parsed = JSON.parse(answer);
              if (typeof parsed === "object") {
                restored[qId] = parsed;
              } else {
                restored[qId] = answer;
              }
            } catch {
              restored[qId] = answer;
            }
          });
          setAnswers(restored);
          setScore(data.score);
          setSubmitted(true);
        }
      })
      .catch(() => setAttempt(null));
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const questions = (quiz.questions ?? []) as Question[];
  const currentQuestion = questions[currentIndex];

  const handleSimpleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleBlankAnswer = (
    questionId: string,
    blankId: string,
    value: string,
  ) => {
    if (submitted) return;
    const existing = (answers[questionId] as Record<string, string>) ?? {};
    setAnswers({ ...answers, [questionId]: { ...existing, [blankId]: value } });
  };

  const isCorrect = (q: Question): boolean => {
    if (q.type === "multiple_choice") {
      const correct = q.choices.find((c) => c.isCorrect);
      return correct ? answers[q._id] === correct._id : false;
    }
    if (q.type === "true_false") {
      return answers[q._id] === q.correctAnswer;
    }
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

  const calculateScore = () =>
    questions.reduce(
      (total, q) => (isCorrect(q) ? total + q.points : total),
      0,
    );

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    const flatAnswers: Record<string, string> = {};
    Object.entries(answers).forEach(([qId, answer]) => {
      if (typeof answer === "string") {
        flatAnswers[qId] = answer;
      } else {
        flatAnswers[qId] = JSON.stringify(answer);
      }
    });

    await client.saveQuizAttempt(qid as string, flatAnswers, finalScore);
  };

  const renderQuestion = (q: Question) => {
    const blanks = q.blanks ?? [];
    const blankAnswers = (answers[q._id] as Record<string, string>) ?? {};

    return (
      <div key={q._id} className="border p-4 mb-3">
        <div className="d-flex justify-content-between mb-2">
          <strong>{q.title}</strong>
          <span>{q.points} pts</span>
        </div>
        <p>{q.question}</p>

        {submitted && (
          <div
            className={`alert ${isCorrect(q) ? "alert-success" : "alert-danger"} py-1`}
          >
            {isCorrect(q) ? "✓ Correct" : "✗ Incorrect"}
          </div>
        )}

        {q.type === "multiple_choice" &&
          q.choices.map((choice) => (
            <div
              key={choice._id}
              className="d-flex align-items-center gap-2 mb-2"
            >
              <input
                type="radio"
                name={q._id}
                value={choice._id}
                checked={answers[q._id] === choice._id}
                onChange={() => handleSimpleAnswer(q._id, choice._id)}
                disabled={submitted}
              />
              <label>{choice.text}</label>
              {submitted && choice.isCorrect && (
                <span className="text-success ms-2">(Correct)</span>
              )}
            </div>
          ))}

        {q.type === "true_false" &&
          ["true", "false"].map((val) => (
            <div key={val} className="d-flex align-items-center gap-2 mb-2">
              <input
                type="radio"
                name={q._id}
                value={val}
                checked={answers[q._id] === val}
                onChange={() => handleSimpleAnswer(q._id, val)}
                disabled={submitted}
              />
              <label>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
              {submitted && q.correctAnswer === val && (
                <span className="text-success ms-2">(Correct)</span>
              )}
            </div>
          ))}

        {q.type === "fill_in_blank" && (
          <div>
            {blanks.length > 0 ? (
              blanks.map((blank, i) => (
                <div key={blank._id} className="mb-3">
                  <label className="form-label small fw-semibold">
                    Blank {i + 1}
                  </label>
                  <input
                    className="form-control"
                    placeholder={`Answer for blank ${i + 1}`}
                    value={blankAnswers[blank._id] ?? ""}
                    onChange={(e) =>
                      handleBlankAnswer(q._id, blank._id, e.target.value)
                    }
                    disabled={submitted}
                  />
                  {submitted && (
                    <div className="text-success mt-1 small">
                      Accepted: {blank.correctAnswers.join(", ")}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <input
                  className="form-control"
                  placeholder="Your answer"
                  value={(answers[q._id] as string) || ""}
                  onChange={(e) => handleSimpleAnswer(q._id, e.target.value)}
                  disabled={submitted}
                />
                {submitted && (
                  <div className="text-success mt-1 small">
                    Accepted: {q.possibleAnswers.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const now = new Date();
  const availableFrom = new Date(quiz.availableFrom);
  const availableUntil = new Date(quiz.availableUntil);
  const isAvailable = now >= availableFrom && now <= availableUntil;

  if (!isAvailable)
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <hr />
        <div className="alert alert-warning">
          {now < availableFrom
            ? `This quiz is not available until ${availableFrom.toLocaleDateString()}`
            : "This quiz is closed."}
        </div>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <hr />
        <div className="alert alert-warning">
          This quiz has no questions yet.
        </div>
      </div>
    );

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && <p>{quiz.description}</p>}
      <hr />

      {submitted && (
        <div className="alert alert-info mb-4">
          <strong>
            Your Score: {score} / {quiz.points}
          </strong>
        </div>
      )}

      {quiz.oneQuestionAtATime && !submitted ? (
        <div>
          {renderQuestion(currentQuestion)}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              ← Previous
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                Next →
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
          </div>
          <div className="mt-3 d-flex gap-2 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q._id}
                className={`btn btn-sm ${i === currentIndex ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setCurrentIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : !submitted ? (
        <div>
          {questions.map((q) => renderQuestion(q))}
          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>{questions.map((q) => renderQuestion(q))}</div>
      )}
    </div>
  );
}
