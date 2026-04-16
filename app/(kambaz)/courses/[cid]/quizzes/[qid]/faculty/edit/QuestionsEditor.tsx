"use client";
import { useState } from "react";
import { Quiz } from "../../../client";
import { v4 as uuidv4 } from "uuid";

interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Blank {
  _id: string;
  correctAnswers: string[]; // multiple accepted answers per blank
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
  blanks: Blank[]; // NEW: structured blanks for fill_in_blank
}

// ─── Shared header (title, type dropdown, pts) ───────────────────────────────
function QuestionHeader({
  q,
  onChange,
}: {
  q: Question;
  onChange: (updated: Question) => void;
}) {
  return (
    <div className="d-flex gap-2 mb-2 flex-wrap">
      <input
        className="form-control w-25"
        placeholder="Title"
        value={q.title}
        onChange={(e) => onChange({ ...q, title: e.target.value })}
      />
      <select
        className="form-select w-25"
        value={q.type}
        onChange={(e) =>
          onChange({ ...q, type: e.target.value as Question["type"] })
        }
      >
        <option value="multiple_choice">Multiple Choice</option>
        <option value="true_false">True/False</option>
        <option value="fill_in_blank">Fill in the Blank</option>
      </select>
      <span className="d-flex align-items-center">pts:</span>
      <input
        type="number"
        className="form-control"
        style={{ width: "80px" }}
        value={q.points}
        onChange={(e) =>
          onChange({ ...q, points: parseInt(e.target.value) || 0 })
        }
      />
    </div>
  );
}

// ─── Unified Question Editor ──────────────────────────────────────────────────
function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>(question);

  // ── Multiple Choice helpers ──────────────────────────────────────────────
  const addChoice = () =>
    setQ({
      ...q,
      choices: [...q.choices, { _id: uuidv4(), text: "", isCorrect: false }],
    });

  const removeChoice = (id: string) =>
    setQ({ ...q, choices: q.choices.filter((c) => c._id !== id) });

  const setCorrect = (id: string) =>
    setQ({
      ...q,
      choices: q.choices.map((c) => ({ ...c, isCorrect: c._id === id })),
    });

  const updateChoiceText = (id: string, text: string) =>
    setQ({
      ...q,
      choices: q.choices.map((c) => (c._id === id ? { ...c, text } : c)),
    });

  // ── Fill in the Blank helpers ────────────────────────────────────────────
  const blanks: Blank[] = q.blanks ?? [];

  const addBlank = () =>
    setQ({
      ...q,
      blanks: [...blanks, { _id: uuidv4(), correctAnswers: [""] }],
    });

  const removeBlank = (id: string) =>
    setQ({ ...q, blanks: blanks.filter((b) => b._id !== id) });

  const addAnswerToBlank = (blankId: string) =>
    setQ({
      ...q,
      blanks: blanks.map((b) =>
        b._id === blankId
          ? { ...b, correctAnswers: [...b.correctAnswers, ""] }
          : b,
      ),
    });

  const removeAnswerFromBlank = (blankId: string, answerIndex: number) =>
    setQ({
      ...q,
      blanks: blanks.map((b) =>
        b._id === blankId
          ? {
              ...b,
              correctAnswers: b.correctAnswers.filter(
                (_, i) => i !== answerIndex,
              ),
            }
          : b,
      ),
    });

  const updateBlankAnswer = (
    blankId: string,
    answerIndex: number,
    value: string,
  ) =>
    setQ({
      ...q,
      blanks: blanks.map((b) =>
        b._id === blankId
          ? {
              ...b,
              correctAnswers: b.correctAnswers.map((a, i) =>
                i === answerIndex ? value : a,
              ),
            }
          : b,
      ),
    });

  return (
    <div className="border p-3 mb-3">
      {/* Shared header — type change re-renders body automatically */}
      <QuestionHeader q={q} onChange={setQ} />

      <textarea
        className="form-control mb-3"
        rows={3}
        placeholder="Question text"
        value={q.question}
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />

      {/* ── Multiple Choice body ────────────────────────────────────────── */}
      {q.type === "multiple_choice" && (
        <div>
          <strong className="d-block mb-2">Answers:</strong>
          {q.choices.map((choice) => (
            <div
              key={choice._id}
              className="d-flex align-items-center gap-2 mb-2"
            >
              <input
                type="radio"
                name={`correct-${q._id}`}
                title="Mark as correct"
                checked={choice.isCorrect}
                onChange={() => setCorrect(choice._id)}
              />
              <input
                className="form-control"
                placeholder="Answer text"
                value={choice.text}
                onChange={(e) => updateChoiceText(choice._id, e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeChoice(choice._id)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={addChoice}
          >
            + Add Another Answer
          </button>
        </div>
      )}

      {/* ── True/False body ─────────────────────────────────────────────── */}
      {q.type === "true_false" && (
        <div>
          <strong className="d-block mb-2">Correct Answer:</strong>
          <div className="d-flex flex-column gap-2 mb-3">
            {["true", "false"].map((val) => (
              <div key={val} className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`tf-${q._id}`}
                  checked={q.correctAnswer === val}
                  onChange={() => setQ({ ...q, correctAnswer: val })}
                />
                <label>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Fill in the Blank body ──────────────────────────────────────── */}
      {q.type === "fill_in_blank" && (
        <div>
          <strong className="d-block mb-2">Blanks:</strong>
          {blanks.length === 0 && (
            <p className="text-muted small">
              No blanks yet. Click below to add one.
            </p>
          )}
          {blanks.map((blank, blankIndex) => (
            <div key={blank._id} className="border rounded p-2 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="small">Blank {blankIndex + 1}</strong>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeBlank(blank._id)}
                >
                  Remove Blank
                </button>
              </div>
              <div className="text-muted small mb-1">
                Accepted answers (any of these is correct):
              </div>
              {blank.correctAnswers.map((answer, answerIndex) => (
                <div key={answerIndex} className="d-flex gap-2 mb-2">
                  <input
                    className="form-control form-control-sm"
                    placeholder={`Accepted answer ${answerIndex + 1}`}
                    value={answer}
                    onChange={(e) =>
                      updateBlankAnswer(blank._id, answerIndex, e.target.value)
                    }
                  />
                  {blank.correctAnswers.length > 1 && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        removeAnswerFromBlank(blank._id, answerIndex)
                      }
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => addAnswerToBlank(blank._id)}
              >
                + Add Accepted Answer
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-primary mb-3"
            onClick={addBlank}
          >
            + Add Blank
          </button>
        </div>
      )}

      {/* ── Actions ─────────────────────────────────────────────────────── */}
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onSave(q)}>
          Save Question
        </button>
      </div>
    </div>
  );
}

// ─── Main QuizQuestionsEditor ─────────────────────────────────────────────────
export default function QuizQuestionsEditor({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const questions = (quiz.questions ?? []) as Question[];

  const addQuestion = () => {
    const newQuestion: Question = {
      _id: uuidv4(),
      title: "New Question",
      type: "multiple_choice",
      points: 0,
      question: "",
      choices: [{ _id: uuidv4(), text: "", isCorrect: false }],
      correctAnswer: "true",
      possibleAnswers: [],
      blanks: [],
    };
    setQuiz({ ...quiz, questions: [...questions, newQuestion] });
    setEditingId(newQuestion._id);
  };

  const saveQuestion = (saved: Question) => {
    const updated = questions.map((q) => (q._id === saved._id ? saved : q));
    const totalPoints = updated.reduce((sum, q) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updated, points: totalPoints });
    setEditingId(null);
  };

  const deleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q._id !== id);
    const totalPoints = updated.reduce((sum, q) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updated, points: totalPoints });
    if (editingId === id) setEditingId(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary" onClick={addQuestion}>
          + New Question
        </button>
      </div>

      {questions.length === 0 && (
        <p className="text-muted text-center">
          No questions yet. Click + New Question to add one.
        </p>
      )}

      {questions.map((q) => (
        <div key={q._id}>
          {editingId === q._id ? (
            <QuestionEditor
              question={q}
              onSave={saveQuestion}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="border p-3 mb-3 d-flex justify-content-between align-items-center">
              <div>
                <strong>{q.title}</strong>
                <span className="ms-2 text-muted">
                  ({q.type.replace(/_/g, " ")}) — {q.points} pts
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setEditingId(q._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteQuestion(q._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
