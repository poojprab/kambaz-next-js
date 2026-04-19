"use client";
import { Quiz } from "../../client";

export default function QuizDetailsTable({
  quiz,
  actions,
}: {
  quiz: Quiz;
  actions?: React.ReactNode;
}) {
  return (
    <div id="wd-quiz-details" className="p-4">
      {actions && (
        <div className="d-flex justify-content-end gap-2 mb-4">{actions}</div>
      )}
      <hr />
      <h2>{quiz.title}</h2>
      <hr />
      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <td className="text-end fw-bold">Quiz Type</td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Time Limit</td>
            <td>
              {quiz.timeLimit > 0 ? `${quiz.timeLimit} Minutes` : "No Limit"}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">How Many Attempts</td>
            <td>{quiz.multipleAttempts ? quiz.howManyAttempts : 1}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers || "Immediately"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Access Code</td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Due</td>
            <td>
              {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Available From</td>
            <td>
              {quiz.availableFrom
                ? new Date(quiz.availableFrom).toLocaleString()
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Until</td>
            <td>
              {quiz.availableUntil
                ? new Date(quiz.availableUntil).toLocaleString()
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
