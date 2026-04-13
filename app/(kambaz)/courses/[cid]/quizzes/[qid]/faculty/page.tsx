"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";
import { Quiz } from "../../client";
import { FaBan, FaCheckCircle } from "react-icons/fa";

export default function QuizFacultyDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    client.findQuizById(qid as string).then(setQuiz);
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const handlePublishToggle = async () => {
    const updated = await client.updateQuiz({
      ...quiz,
      published: !quiz.published,
    });
    setQuiz(updated);
  };

  return (
    <div id="wd-quiz-details" className="p-4">
      <div className="d-flex justify-content-end gap-2 mb-4">
        <button className="btn btn-secondary" onClick={handlePublishToggle}>
          {quiz.published ? (
            <>
              <FaCheckCircle className="text-success me-1" /> Published
            </>
          ) : (
            <>
              <FaBan className="text-secondary me-1" /> Unpublished
            </>
          )}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/faculty/preview`)
          }
        >
          Preview
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/faculty/edit`)
          }
        >
          Edit
        </button>
      </div>
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
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">How Many Attempts</td>
            <td>{quiz.howManyAttempts}</td>
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
