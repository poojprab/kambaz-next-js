/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, togglePublish, setQuizzes } from "./reducer";
import { RootState } from "../../../store";
import {
  FaPlus,
  FaSearch,
  FaEllipsisV,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { useEffect } from "react";
import * as client from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const courseQuizzes = quizzes.filter((q: any) => q.course === cid);
  const visibleQuizzes = isFaculty
    ? courseQuizzes
    : courseQuizzes.filter((q: any) => q.published);

  const handleDelete = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(togglePublish(quiz._id));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const from = new Date(quiz.availableFrom);
    const until = new Date(quiz.availableUntil);
    if (now > until) return "Closed";
    if (now >= from) return "Available";
    return `Not available until ${new Date(quiz.availableFrom).toLocaleDateString()}`;
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            id="wd-search-quiz"
          />
        </div>
        {isFaculty && (
          <button
            className="btn btn-danger"
            id="wd-add-quiz"
            onClick={() => router.push(`/courses/${cid}/quizzes/new`)}
          >
            <FaPlus className="me-1" /> Quiz
          </button>
        )}
      </div>

      <div className="p-3 d-flex justify-content-between align-items-center bg-light border border-bottom-0">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-4" />
          <strong>QUIZZES</strong>
        </div>
        <FaEllipsisV />
      </div>

      <ul
        id="wd-quiz-list"
        className="list-group list-group-flush border border-top-0"
      >
        {visibleQuizzes.map((quiz: any) => (
          <li
            key={quiz._id}
            className="list-group-item"
            style={{ borderLeft: "4px solid green" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-4 text-muted" />
                <div>
                  <div
                    className="fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/courses/${cid}/quizzes/${quiz._id}`)
                    }
                  >
                    {quiz.title}
                  </div>
                  <div className="small text-muted">
                    <span
                      className={
                        getAvailabilityStatus(quiz) === "Available"
                          ? "text-success"
                          : getAvailabilityStatus(quiz) === "Closed"
                            ? "text-danger"
                            : ""
                      }
                    >
                      {getAvailabilityStatus(quiz)}
                    </span>
                    {" | "}
                    <b>Due</b> {new Date(quiz.dueDate).toLocaleDateString()} |{" "}
                    {quiz.points} pts | {quiz.questions?.length || 0} Questions
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                {isFaculty && (
                  <>
                    <span
                      onClick={() => handleTogglePublish(quiz)}
                      style={{ cursor: "pointer" }}
                      className="me-2"
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaBan className="text-secondary" />
                      )}
                    </span>
                    <FaPencil
                      className="text-primary me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)
                      }
                    />
                    <FaTrash
                      className="text-danger me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(quiz._id)}
                    />
                  </>
                )}
                <FaEllipsisV />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
