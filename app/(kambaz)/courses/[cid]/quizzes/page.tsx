"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, togglePublish, setQuizzes, addQuiz } from "./reducer";
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
import { useEffect, useState } from "react";
import * as client from "./client";
import { Quiz } from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = currentUser?.role === "FACULTY";
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [attempts, setAttempts] = useState<Record<string, number>>({});

  useEffect(() => {
    client
      .findQuizzesForCourse(cid as string)
      .then((data) => dispatch(setQuizzes(data)));
  }, [cid]);

  const courseQuizzes = quizzes
    .filter((q: Quiz) => q.course === cid)
    .filter((q: Quiz) => isFaculty || q.published)
    .sort(
      (a: Quiz, b: Quiz) =>
        new Date(a.availableFrom).getTime() -
        new Date(b.availableFrom).getTime(),
    );

  useEffect(() => {
    if (!isFaculty) {
      courseQuizzes.forEach((quiz: Quiz) => {
        client
          .findQuizAttempt(quiz._id)
          .then((attempt) => {
            if (attempt) {
              setAttempts((prev) => ({ ...prev, [quiz._id]: attempt.score }));
            }
          })
          .catch(() => {});
      });
    }
  }, [courseQuizzes, isFaculty]);

  const handleDelete = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
    setOpenMenuId(null);
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    const updated = await client.updateQuiz({
      ...quiz,
      published: !quiz.published,
    });
    dispatch(togglePublish(quiz._id));
    return updated;
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const from = new Date(quiz.availableFrom);
    const until = new Date(quiz.availableUntil);
    if (now > until) return "Closed";
    if (now >= from) return "Available";
    return `Not available until ${from.toLocaleDateString()}`;
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      course: cid as string,
      description: "",
      points: 0,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      published: false,
      questions: [],
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/faculty/edit`);
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {isFaculty && (
          <button
            className="btn btn-danger"
            id="wd-add-quiz"
            onClick={handleAddQuiz}
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

      {courseQuizzes.length === 0 ? (
        <div className="border p-4 text-center text-muted">
          {isFaculty ? (
            <>
              No quizzes yet. Click <strong>+ Quiz</strong> to add one.
            </>
          ) : (
            "No quizzes available yet."
          )}
        </div>
      ) : (
        <ul
          id="wd-quiz-list"
          className="list-group list-group-flush border border-top-0"
        >
          {courseQuizzes.map((quiz: Quiz) => (
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
                        router.push(
                          isFaculty
                            ? `/courses/${cid}/quizzes/${quiz._id}/faculty`
                            : `/courses/${cid}/quizzes/${quiz._id}/student`,
                        )
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
                      <b>Due</b>{" "}
                      {quiz.dueDate
                        ? new Date(quiz.dueDate).toLocaleDateString()
                        : "N/A"}{" "}
                      | {quiz.points} pts | {quiz.questions?.length || 0}{" "}
                      Questions
                      {!isFaculty && attempts[quiz._id] !== undefined && (
                        <span
                          className={`ms-2 ${attempts[quiz._id] / quiz.points >= 0.7 ? "text-success" : "text-danger"}`}
                        >
                          | Score: {attempts[quiz._id]} / {quiz.points}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 position-relative">
                  {isFaculty && (
                    <>
                      <span
                        onClick={() => handleTogglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <FaBan className="text-secondary" />
                        )}
                      </span>

                      <FaEllipsisV
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === quiz._id ? null : quiz._id,
                          )
                        }
                      />

                      {openMenuId === quiz._id && (
                        <div
                          className="position-absolute bg-white border shadow rounded p-2"
                          style={{
                            right: 0,
                            top: "100%",
                            zIndex: 100,
                            minWidth: "150px",
                          }}
                        >
                          <div
                            className="p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/faculty/edit`,
                              );
                              setOpenMenuId(null);
                            }}
                          >
                            <FaPencil className="me-2" /> Edit
                          </div>
                          <div
                            className="p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(quiz._id)}
                          >
                            <FaTrash className="me-2 text-danger" /> Delete
                          </div>
                          <div
                            className="p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleTogglePublish(quiz);
                              setOpenMenuId(null);
                            }}
                          >
                            {quiz.published ? (
                              <>
                                <FaBan className="me-2" /> Unpublish
                              </>
                            ) : (
                              <>
                                <FaCheckCircle className="me-2 text-success" />{" "}
                                Publish
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
