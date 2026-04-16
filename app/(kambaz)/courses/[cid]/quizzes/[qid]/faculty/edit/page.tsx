"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../../../reducer";
import * as client from "../../../client";
import { Quiz } from "../../../client";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestionsEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    "details",
  );

  useEffect(() => {
    client.findQuizById(qid as string).then(setQuiz);
  }, [qid]);

  const handleSave = async () => {
    if (!quiz) return;
    const updated = await client.updateQuiz(quiz);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}/faculty`);
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    const updated = await client.updateQuiz({ ...quiz, published: true });
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-editor" className="p-4">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <QuizDetailsEditor quiz={quiz} setQuiz={setQuiz} />
      )}
      {activeTab === "questions" && (
        <QuizQuestionsEditor quiz={quiz} setQuiz={setQuiz} />
      )}

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
