"use client";
import { useState } from "react";
import { Quiz } from "../../../client";
import { v4 as uuidv4 } from "uuid";
import { Question, QuestionGroup } from "../../../client";

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

  const blanks = q.blanks ?? [];
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
      <QuestionHeader q={q} onChange={setQ} />
      <textarea
        className="form-control mb-3"
        rows={3}
        placeholder="Question text"
        value={q.question}
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />

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

export default function QuizQuestionsEditor({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const groups = (quiz.groups ?? []) as QuestionGroup[];
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

  const addGroup = () => {
    const newGroup: QuestionGroup = {
      _id: uuidv4(),
      name: "New Question Group",
      pickCount: 1,
      pointsPerQuestion: 1,
      questionIds: [],
    };
    setQuiz({ ...quiz, groups: [...groups, newGroup] });
  };

  // ✅ FIX: update just the changed group, leave others untouched
  const updateGroup = (updated: QuestionGroup) => {
    setQuiz({
      ...quiz,
      groups: groups.map((g) => (g._id === updated._id ? updated : g)),
    });
  };

  const deleteGroup = (id: string) => {
    setQuiz({ ...quiz, groups: groups.filter((g) => g._id !== id) });
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
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-outline-secondary" onClick={addGroup}>
          + New Question Group
        </button>
        <button className="btn btn-outline-secondary" onClick={addQuestion}>
          + New Question
        </button>
      </div>

      {/* Question Groups */}
      {groups.map((group) => (
        <div key={group._id} className="border rounded mb-4 bg-light">
          <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <strong>Question Group</strong>
              <input
                className="form-control form-control-sm w-auto"
                value={group.name}
                onChange={(e) =>
                  updateGroup({ ...group, name: e.target.value })
                }
                placeholder="Group name"
              />
              <span className="text-muted small">Pick</span>
              <input
                type="number"
                className="form-control form-control-sm"
                style={{ width: "70px" }}
                value={group.pickCount}
                min={1}
                onChange={(e) =>
                  updateGroup({
                    ...group,
                    pickCount: parseInt(e.target.value) || 1,
                  })
                }
              />
              <span className="text-muted small">questions</span>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteGroup(group._id)}
            >
              Delete Group
            </button>
          </div>

          {/* ✅ FIX: question checkboxes are inside their own questions.map(),
               so q is always properly scoped to each question */}
          <div className="p-3">
            <p className="text-muted small mb-2">
              Select questions to include in this group:
            </p>
            {questions.length === 0 && (
              <p className="text-muted small">No questions available yet.</p>
            )}
            {questions.map((q) => {
              const isChecked = group.questionIds.includes(q._id);
              const atLimit =
                !isChecked && group.questionIds.length >= group.pickCount;
              return (
                <div
                  key={q._id}
                  className="d-flex align-items-center gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={atLimit}
                    onChange={() => {
                      const updatedIds = isChecked
                        ? group.questionIds.filter((id) => id !== q._id)
                        : [...group.questionIds, q._id];
                      updateGroup({ ...group, questionIds: updatedIds });
                    }}
                  />
                  <span>
                    {q.title} — {q.type.replace(/_/g, " ")} — {q.points} pts
                  </span>
                  {atLimit && (
                    <span className="text-muted small ms-2">
                      (group full — increase Pick count to add more)
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Questions List */}
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
