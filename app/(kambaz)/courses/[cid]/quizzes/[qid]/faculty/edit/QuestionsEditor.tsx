"use client";
import { useState } from "react";
import { Quiz } from "../../../client";
import { v4 as uuidv4 } from "uuid";

interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
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
}

function MultipleChoiceEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>(question);

  const addChoice = () => {
    setQ({
      ...q,
      choices: [...q.choices, { _id: uuidv4(), text: "", isCorrect: false }],
    });
  };

  const removeChoice = (id: string) => {
    setQ({ ...q, choices: q.choices.filter((c) => c._id !== id) });
  };

  const setCorrect = (id: string) => {
    setQ({
      ...q,
      choices: q.choices.map((c) => ({ ...c, isCorrect: c._id === id })),
    });
  };

  const updateChoiceText = (id: string, text: string) => {
    setQ({
      ...q,
      choices: q.choices.map((c) => (c._id === id ? { ...c, text } : c)),
    });
  };

  return (
    <div className="border p-3 mb-3">
      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control w-25"
          placeholder="Title"
          value={q.title}
          onChange={(e) => setQ({ ...q, title: e.target.value })}
        />
        <select
          className="form-select w-25"
          value={q.type}
          onChange={(e) =>
            setQ({ ...q, type: e.target.value as Question["type"] })
          }
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True/False</option>
          <option value="fill_in_blank">Fill in the Blank</option>
        </select>
        <span className="d-flex align-items-center">pts:</span>
        <input
          type="number"
          className="form-control w-25"
          value={q.points}
          onChange={(e) => setQ({ ...q, points: parseInt(e.target.value) })}
        />
      </div>
      <textarea
        className="form-control mb-3"
        rows={3}
        placeholder="Question text"
        value={q.question}
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />
      <div className="mb-2">
        <strong>Answers:</strong>
      </div>
      {q.choices.map((choice) => (
        <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="radio"
            name={`correct-${q._id}`}
            checked={choice.isCorrect}
            onChange={() => setCorrect(choice._id)}
          />
          <input
            className="form-control"
            value={choice.text}
            onChange={(e) => updateChoiceText(choice._id, e.target.value)}
          />
          <button
            className="btn btn-sm btn-danger"
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
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onSave(q)}>
          Update Question
        </button>
      </div>
    </div>
  );
}

function TrueFalseEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>(question);

  return (
    <div className="border p-3 mb-3">
      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control w-25"
          placeholder="Title"
          value={q.title}
          onChange={(e) => setQ({ ...q, title: e.target.value })}
        />
        <select
          className="form-select w-25"
          value={q.type}
          onChange={(e) =>
            setQ({ ...q, type: e.target.value as Question["type"] })
          }
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True/False</option>
          <option value="fill_in_blank">Fill in the Blank</option>
        </select>
        <span className="d-flex align-items-center">pts:</span>
        <input
          type="number"
          className="form-control w-25"
          value={q.points}
          onChange={(e) => setQ({ ...q, points: parseInt(e.target.value) })}
        />
      </div>
      <textarea
        className="form-control mb-3"
        rows={3}
        placeholder="Question text"
        value={q.question}
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />
      <div className="mb-2">
        <strong>Answers:</strong>
      </div>
      <div className="d-flex flex-column gap-2 mb-3">
        <div className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={q.correctAnswer === "true"}
            onChange={() => setQ({ ...q, correctAnswer: "true" })}
          />
          <label>True</label>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={q.correctAnswer === "false"}
            onChange={() => setQ({ ...q, correctAnswer: "false" })}
          />
          <label>False</label>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onSave(q)}>
          Update Question
        </button>
      </div>
    </div>
  );
}

function FillInBlankEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>(question);

  const addAnswer = () => {
    setQ({ ...q, possibleAnswers: [...q.possibleAnswers, ""] });
  };

  const removeAnswer = (index: number) => {
    setQ({
      ...q,
      possibleAnswers: q.possibleAnswers.filter((_, i) => i !== index),
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const updated = [...q.possibleAnswers];
    updated[index] = value;
    setQ({ ...q, possibleAnswers: updated });
  };

  return (
    <div className="border p-3 mb-3">
      <div className="d-flex gap-2 mb-2">
        <input
          className="form-control w-25"
          placeholder="Title"
          value={q.title}
          onChange={(e) => setQ({ ...q, title: e.target.value })}
        />
        <select
          className="form-select w-25"
          value={q.type}
          onChange={(e) =>
            setQ({ ...q, type: e.target.value as Question["type"] })
          }
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True/False</option>
          <option value="fill_in_blank">Fill in the Blank</option>
        </select>
        <span className="d-flex align-items-center">pts:</span>
        <input
          type="number"
          className="form-control w-25"
          value={q.points}
          onChange={(e) => setQ({ ...q, points: parseInt(e.target.value) })}
        />
      </div>
      <textarea
        className="form-control mb-3"
        rows={3}
        placeholder="Question text"
        value={q.question}
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />
      <div className="mb-2">
        <strong>Answers:</strong>
      </div>
      {q.possibleAnswers.map((answer, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            placeholder="Possible Answer"
            value={answer}
            onChange={(e) => updateAnswer(index, e.target.value)}
          />
          <button
            className="btn btn-sm btn-danger"
            onClick={() => removeAnswer(index)}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={addAnswer}
      >
        + Add Another Answer
      </button>
      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onSave(q)}>
          Update Question
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

  const questions = quiz.questions as Question[];

  const addQuestion = () => {
    const newQuestion: Question = {
      _id: uuidv4(),
      title: "New Question",
      type: "multiple_choice",
      points: 0,
      question: "",
      choices: [{ _id: uuidv4(), text: "", isCorrect: false }],
      correctAnswer: "true",
      possibleAnswers: [""],
    };
    const updated = [...questions, newQuestion];
    setQuiz({ ...quiz, questions: updated });
    setEditingId(newQuestion._id);
  };

  const saveQuestion = (saved: Question) => {
    const updated = questions.map((q) => (q._id === saved._id ? saved : q));
    const totalPoints = updated.reduce((sum, q) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updated, points: totalPoints });
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const deleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q._id !== id);
    const totalPoints = updated.reduce((sum, q) => sum + q.points, 0);
    setQuiz({ ...quiz, questions: updated, points: totalPoints });
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
            <>
              {q.type === "multiple_choice" && (
                <MultipleChoiceEditor
                  question={q}
                  onSave={saveQuestion}
                  onCancel={cancelEdit}
                />
              )}
              {q.type === "true_false" && (
                <TrueFalseEditor
                  question={q}
                  onSave={saveQuestion}
                  onCancel={cancelEdit}
                />
              )}
              {q.type === "fill_in_blank" && (
                <FillInBlankEditor
                  question={q}
                  onSave={saveQuestion}
                  onCancel={cancelEdit}
                />
              )}
            </>
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
