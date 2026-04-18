"use client";
// this is the student view
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Quiz, QuestionGroup } from "../../client";

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
  const [attemptCount, setAttemptCount] = useState(0);
  const [attemptLocked, setAttemptLocked] = useState(false);

  useEffect(() => {
    client.findQuizById(qid as string).then((q) => {
      setQuiz(q);
      client
        .findQuizAttempt(qid as string)
        .then((data) => {
          if (data) {
            setAttempt(data);
            const count = (data as any).attemptCount ?? 1;
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
            // check if locked out
            const maxAttempts = q.multipleAttempts ? q.howManyAttempts : 1;
            if (count >= maxAttempts) {
              setAttemptLocked(true);
            }
          }
        })
        .catch(() => setAttempt(null));
    });
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const questions = (quiz.questions ?? []) as Question[];
  const groups = (quiz.groups ?? []) as QuestionGroup[];
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

  const calculateScore = () =>
    questions.reduce(
      (total, q) => (isCorrect(q) ? total + q.points : total),
      0,
    );

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    const newCount = attemptCount + 1;
    setAttemptCount(newCount);

    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    if (newCount >= maxAttempts) {
      setAttemptLocked(true);
    }

    const flatAnswers: Record<string, string> = {};
    Object.entries(answers).forEach(([qId, answer]) => {
      flatAnswers[qId] =
        typeof answer === "string" ? answer : JSON.stringify(answer);
    });
    await client.saveQuizAttempt(qid as string, flatAnswers, finalScore);
  };

  const renderQuestion = (q: Question, nested = false) => {
    const blanks = q.blanks ?? [];
    const blankAnswers = (answers[q._id] as Record<string, string>) ?? {};
    return (
      <div
        className={nested ? "mb-3" : "mb-4"}
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#adb5bd", fontSize: "16px" }}>⠿</span>
          <strong style={{ fontSize: "15px" }}>Question</strong>
          <span className="ms-auto text-muted" style={{ fontSize: "13px" }}>
            {q.points} pts
          </span>
        </div>
        <div style={{ padding: "20px 24px", background: "#fff" }}>
          <p style={{ marginBottom: "16px" }}>{q.question}</p>
          {submitted && (
            <div
              className={`alert ${isCorrect(q) ? "alert-success" : "alert-danger"} py-1 mb-3`}
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
      </div>
    );
  };

  const renderGroupContainer = (
    group: QuestionGroup,
    children: React.ReactNode,
  ) => (
    <div
      key={group._id}
      className="mb-4"
      style={{
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#adb5bd", fontSize: "16px" }}>⠿</span>
        <strong>{group.name}</strong>
      </div>
      <div style={{ padding: "16px 24px", background: "#f8f9fa" }}>
        {children}
      </div>
    </div>
  );

  const renderGroupedQuestions = () => {
    const groupedQuestionIds = new Set(groups.flatMap((g) => g.questionIds));
    const standaloneQuestions = questions.filter(
      (q) => !groupedQuestionIds.has(q._id),
    );
    return (
      <div>
        {groups.map((group) => {
          const groupQuestions = questions.filter((q) =>
            group.questionIds.includes(q._id),
          );
          return renderGroupContainer(
            group,
            groupQuestions.length === 0 ? (
              <p className="text-muted small mb-0">
                No questions assigned to this group yet.
              </p>
            ) : (
              groupQuestions.map((q) => (
                <div key={q._id}>{renderQuestion(q, true)}</div>
              ))
            ),
          );
        })}
        {standaloneQuestions.map((q) => (
          <div key={q._id}>{renderQuestion(q, false)}</div>
        ))}
      </div>
    );
  };

  const renderOneAtATime = () => {
    const currentGroup = groups.find((g) =>
      g.questionIds.includes(currentQuestion._id),
    );
    return (
      <div>
        {currentGroup ? (
          renderGroupContainer(
            currentGroup,
            <div key={currentQuestion._id}>
              {renderQuestion(currentQuestion, true)}
            </div>,
          )
        ) : (
          <div key={currentQuestion._id}>
            {renderQuestion(currentQuestion, false)}
          </div>
        )}
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
              className={`btn btn-sm ${
                i === currentIndex ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
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
      )}
      {quiz.oneQuestionAtATime && !submitted ? (
        renderOneAtATime()
      ) : !submitted ? (
        <div>
          {renderGroupedQuestions()}
          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>{renderGroupedQuestions()}</div>
      )}
    </div>
  );
}
