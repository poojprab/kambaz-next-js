"use client";
import { Quiz } from "../../../client";

// This component is for editing quiz details (title, description, type, etc.)
// Contains many form fields for each quiz property and then calls setQuiz on change (state in parent component)
export default function QuizDetailsEditor({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: (quiz: Quiz) => void;
}) {
  return (
    <div>
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

      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="timeLimit"
            checked={quiz.timeLimit > 0}
            onChange={(e) =>
              setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })
            }
          />
          <label className="form-check-label" htmlFor="timeLimit">
            Time Limit
          </label>
        </div>
        {quiz.timeLimit > 0 && (
          <input
            type="number"
            className="form-control mt-2 w-25"
            value={quiz.timeLimit}
            onChange={(e) =>
              setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
            }
          />
        )}
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
            className="form-control w-25"
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
        <label className="form-label fw-bold">Show Correct Answers</label>
        <select
          className="form-select"
          value={quiz.showCorrectAnswers}
          onChange={(e) =>
            setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
          }
        >
          <option value="immediately">Immediately</option>
          <option value="after_due_date">After Due Date</option>
          <option value="never">Never</option>
        </select>
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
    </div>
  );
}
