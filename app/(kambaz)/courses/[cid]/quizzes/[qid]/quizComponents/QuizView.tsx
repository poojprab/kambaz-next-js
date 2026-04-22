"use client";
import { Quiz, Question, QuestionGroup } from "../../client";

type AllAnswers = Record<string, string | Record<string, string>>;

interface QuizViewProps {
  quiz: Quiz;
  answers: AllAnswers;
  submitted: boolean;
  currentIndex: number;
  searchTerm: string;
  onSimpleAnswer: (questionId: string, answer: string) => void;
  onBlankAnswer: (questionId: string, blankId: string, value: string) => void;
  onSubmit: () => void;
  onNavigate: (index: number) => void;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  isCorrect: (q: Question) => boolean;
  afterSubmitContent?: React.ReactNode;
}

export default function QuizView({
  quiz,
  answers,
  submitted,
  currentIndex,
  searchTerm,
  onSimpleAnswer,
  onBlankAnswer,
  onSubmit,
  onNavigate,
  onSearchChange,
  onSearch,
  isCorrect,
  afterSubmitContent,
}: QuizViewProps) {
  const questions = (quiz.questions ?? []) as Question[];
  const groups = (quiz.groups ?? []) as QuestionGroup[];
  const currentQuestion = questions[currentIndex];

  // Render each individual question based on type, showing correct/incorrect if submitted
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
          {/* Show correct/incorrect and correct answers if submitted */}
          {submitted && (
            <div
              className={`alert ${
                isCorrect(q) ? "alert-success" : "alert-danger"
              } py-1 mb-3`}
            >
              {isCorrect(q) ? "✓ Correct" : "✗ Incorrect"}
            </div>
          )}

          {/* MULTIPLE CHOICE */}
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
                    !submitted && onSimpleAnswer(q._id, choice._id)
                  }
                  disabled={submitted}
                />
                <label>{choice.text}</label>
                {submitted && choice.isCorrect && (
                  <span className="text-success ms-2">(Correct Answer)</span>
                )}
              </div>
            ))}

          {/* TRUE OR FALSE */}
          {q.type === "true_false" &&
            ["true", "false"].map((val) => (
              <div key={val} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="radio"
                  name={q._id}
                  value={val}
                  checked={answers[q._id] === val}
                  onChange={() => !submitted && onSimpleAnswer(q._id, val)}
                  disabled={submitted}
                />
                <label>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
                {submitted && q.correctAnswer === val && (
                  <span className="text-success ms-2">(Correct Answer)</span>
                )}
              </div>
            ))}

          {/* FILL IN THE BLANK */}
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
                      value={blankAnswers[blank._id] ?? ""}
                      onChange={(e) =>
                        !submitted &&
                        onBlankAnswer(q._id, blank._id, e.target.value)
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
                    value={(answers[q._id] as string) || ""}
                    onChange={(e) =>
                      !submitted && onSimpleAnswer(q._id, e.target.value)
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

  // Renders a question group container with the given child content, used to wrap questions that are in a group with the group name as the header
  const renderGroupContainer = (
    group: QuestionGroup,
    child: React.ReactNode,
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
        }}
      >
        <strong>{group.name}</strong>
      </div>
      <div style={{ padding: "16px 24px", background: "#f8f9fa" }}>{child}</div>
    </div>
  );

  const renderOneAtATime = () => {
    if (!currentQuestion) return null;

    const currentGroup = groups.find((g) =>
      g.questionIds.includes(currentQuestion._id),
    );

    const questionContent = renderQuestion(currentQuestion, !!currentGroup);

    return (
      <div>
        {currentGroup
          ? renderGroupContainer(currentGroup, questionContent)
          : questionContent}

        {/* Navigation */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary"
            disabled={currentIndex === 0}
            onClick={() => onNavigate(currentIndex - 1)}
          >
            ← Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => onNavigate(currentIndex + 1)}
            >
              Next →
            </button>
          ) : !submitted ? (
            <button className="btn btn-danger" onClick={onSubmit}>
              Submit Quiz
            </button>
          ) : null}
        </div>

        {/* Question Jump */}
        <div className="mt-3">
          <strong>Questions:</strong>
          <div className="d-flex gap-2 mt-2 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q._id}
                className={`btn btn-sm ${
                  i === currentIndex ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => onNavigate(i)}
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
    <div>
      {/* Search */}
      <div className="mb-4 d-flex gap-2">
        <input
          className="form-control"
          placeholder="Find a question..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button className="btn btn-outline-secondary" onClick={onSearch}>
          Find
        </button>
      </div>

      {/* Checks if we've submitted and renders the after submit content from the parent (student or faculty) */}
      {submitted && afterSubmitContent}
      {/* Then renders all the questions one at a time with the navigation */}
      {renderOneAtATime()}
    </div>
  );
}
