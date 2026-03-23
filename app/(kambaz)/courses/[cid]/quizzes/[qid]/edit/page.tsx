/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../../reducer";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    load();
  }, [qid]);

  const handleSave = async () => {
    const updated = await client.updateQuiz(quiz);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleSaveAndPublish = async () => {
    const updated = await client.updateQuiz({ ...quiz, published: true });
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-editor" className="p-4">
      <div className="mb-3">
        <label className="form-label fw-bold">Title</label>
        <input
          className="form-control"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Points</label>
        <input
          type="number"
          className="form-control"
          value={quiz.points}
          onChange={(e) =>
            setQuiz({ ...quiz, points: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Quiz Type</label>
        <select
          className="form-select"
          value={quiz.quizType}
          onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
        >
          <option>Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Graded Survey</option>
          <option>Ungraded Survey</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Assignment Group</label>
        <select
          className="form-select"
          value={quiz.assignmentGroup}
          onChange={(e) =>
            setQuiz({ ...quiz, assignmentGroup: e.target.value })
          }
        >
          <option>Quizzes</option>
          <option>Exams</option>
          <option>Assignments</option>
          <option>Project</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Time Limit (minutes)</label>
        <input
          type="number"
          className="form-control"
          value={quiz.timeLimit}
          onChange={(e) =>
            setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="shuffleAnswers"
          checked={quiz.shuffleAnswers}
          onChange={(e) =>
            setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="shuffleAnswers">
          Shuffle Answers
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="multipleAttempts"
          checked={quiz.multipleAttempts}
          onChange={(e) =>
            setQuiz({ ...quiz, multipleAttempts: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="multipleAttempts">
          Multiple Attempts
        </label>
      </div>

      {quiz.multipleAttempts && (
        <div className="mb-3">
          <label className="form-label fw-bold">How Many Attempts</label>
          <input
            type="number"
            className="form-control"
            value={quiz.howManyAttempts}
            onChange={(e) =>
              setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })
            }
          />
        </div>
      )}

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="oneQuestionAtATime"
          checked={quiz.oneQuestionAtATime}
          onChange={(e) =>
            setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="oneQuestionAtATime">
          One Question at a Time
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="webcamRequired"
          checked={quiz.webcamRequired}
          onChange={(e) =>
            setQuiz({ ...quiz, webcamRequired: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="webcamRequired">
          Webcam Required
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="lockQuestions"
          checked={quiz.lockQuestionsAfterAnswering}
          onChange={(e) =>
            setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="lockQuestions">
          Lock Questions After Answering
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Access Code</label>
        <input
          className="form-control"
          value={quiz.accessCode}
          onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Due Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.dueDate}
          onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Available From</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.availableFrom}
          onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Available Until</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.availableUntil}
          onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
        />
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSaveAndPublish}>
          Save & Publish
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
