"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";
import { Quiz } from "../../client";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import QuizDetailsTable from "../quizComponents/QuizDetailsTable";

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
    <QuizDetailsTable
      quiz={quiz}
      actions={
        <>
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
        </>
      }
    />
  );
}
