"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";

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
  possibleAnswers: string[]; // legacy fallback
  blanks: Blank[]; // new structured blanks
}

interface Quiz {
  _id: string;
  title: string;
  points: number;
  questions: Question[];
  oneQuestionAtATime: boolean;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // answers: for fill_in_blank, stored as Record<questionId, Record<blankId, string>>
  const [answers, setAnswers] = useState<
    Record<string, string | Record<string, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    client.findQuizById(qid as string).then((data) => setQuiz(data as Quiz));
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  if (!quiz.questions || quiz.questions.length === 0) {
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
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];

  const handleSimpleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleBlankAnswer = (
    questionId: string,
    blankId: string,
    value: string,
  ) => {
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
      // Legacy fallback: if no blanks structure, use possibleAnswers
      if (blanks.length === 0) {
        return q.possibleAnswers
          .map((a) => a.toLowerCase())
          .includes((answers[q._id] as string)?.toLowerCase());
      }
      // All blanks must be answered correctly
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

  const handleSubmit = () => {
    setScore(calculateScore());
    setSubmitted(true);
  };

  // ── Render a single question ─────────────────────────────────────────────────

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

        {/* Multiple Choice */}
        {q.type === "multiple_choice" && (
          <div>
            {q.choices.map((choice) => (
              <div
                key={choice._id}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <input
                  type="radio"
                  name={q._id}
                  value={choice._id}
                  checked={answers[q._id] === choice._id}
                  onChange={() =>
                    !submitted && handleSimpleAnswer(q._id, choice._id)
                  }
                  disabled={submitted}
                />
                <label>{choice.text}</label>
                {submitted && choice.isCorrect && (
                  <span className="text-success ms-2">(Correct Answer)</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* True/False */}
        {q.type === "true_false" && (
          <div>
            {["true", "false"].map((val) => (
              <div key={val} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="radio"
                  name={q._id}
                  value={val}
                  checked={answers[q._id] === val}
                  onChange={() => !submitted && handleSimpleAnswer(q._id, val)}
                  disabled={submitted}
                />
                <label>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
                {submitted && q.correctAnswer === val && (
                  <span className="text-success ms-2">(Correct Answer)</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Fill in the Blank */}
        {q.type === "fill_in_blank" && (
          <div>
            {/* New structured blanks */}
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
                      !submitted &&
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
              // Legacy fallback for old possibleAnswers structure
              <div>
                <input
                  className="form-control"
                  placeholder="Your answer"
                  value={(answers[q._id] as string) || ""}
                  onChange={(e) =>
                    !submitted && handleSimpleAnswer(q._id, e.target.value)
                  }
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

  return (
    <div id="wd-quiz-preview" className="p-4">
      <div className="alert alert-warning">
        This is a preview of the published version of the quiz.
      </div>
      <h2>{quiz.title}</h2>
      <hr />

      {submitted ? (
        <div>
          <div className="alert alert-info mb-4">
            <strong>
              Score: {score} / {quiz.points}
            </strong>
          </div>
          {questions.map((q) => renderQuestion(q))}
          <button
            className="btn btn-secondary mt-3"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/faculty/edit`)
            }
          >
            Keep Editing This Quiz
          </button>
        </div>
      ) : quiz.oneQuestionAtATime ? (
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
          <div className="mt-3">
            <strong>Questions:</strong>
            <div className="d-flex gap-2 mt-2 flex-wrap">
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
        </div>
      ) : (
        <div>
          {questions.map((q) => renderQuestion(q))}
          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
