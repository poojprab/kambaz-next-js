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
  possibleAnswers: string[];
  blanks: Blank[];
}
interface QuestionGroup {
  _id: string;
  name: string;
  pickCount: number;
  pointsPerQuestion: number;
  questionIds: string[];
}
interface Quiz {
  _id: string;
  title: string;
  points: number;
  questions: Question[];
  groups: QuestionGroup[];
  oneQuestionAtATime: boolean;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, string | Record<string, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const match = questions.find(
      (q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (match) {
      const idx = questions.findIndex((q) => q._id === match._id);
      setCurrentIndex(idx);
    }
  };

  useEffect(() => {
    client.findQuizById(qid as string).then((data) => setQuiz(data as Quiz));
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

  const questions = quiz.questions;
  const groups = quiz.groups ?? [];
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

  const handleSubmit = () => {
    setScore(calculateScore());
    setSubmitted(true);
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
          <strong style={{ fontSize: "15px" }}>{q.title}</strong>
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
          {q.type === "true_false" &&
            ["true", "false"].map((val) => (
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
      </div>
    );
  };

  const renderGroupContainer = (
    group: QuestionGroup,
    children: React.ReactNode,
  ) => (
    <div
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
        <span className="text-muted" style={{ fontSize: "14px" }}>
          Pick {group.pickCount} question{group.pickCount !== 1 ? "s" : ""}
        </span>
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
        <div className="mt-3">
          <strong>Questions:</strong>
          <div className="d-flex gap-2 mt-2 flex-wrap">
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
      <div className="mb-4 d-flex gap-2">
        <input
          className="form-control"
          placeholder="Find a question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>
          Find
        </button>
      </div>
      {submitted ? (
        <div>
          <div className="alert alert-info mb-4">
            <strong>
              Score: {score} / {quiz.points}
            </strong>
          </div>
          {renderGroupedQuestions()}
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
        renderOneAtATime()
      ) : (
        <div>
          {renderGroupedQuestions()}
          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
