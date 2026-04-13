"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Quiz } from "../../client";

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

interface Attempt {
  answers: Record<string, string>;
  score: number;
}

export default function TakeQuiz() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client.findQuizById(qid as string).then(setQuiz);
    client
      .findQuizAttempt(qid as string)
      .then((data) => {
        if (data) {
          setAttempt(data);
          setAnswers(data.answers);
          setScore(data.score);
          setSubmitted(true);
        }
      })
      .catch(() => setAttempt(null));
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const questions = quiz.questions as Question[];
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (questionId: string, answer: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: answer });
  };

  const isCorrect = (q: Question): boolean => {
    const answer = answers[q._id];
    if (q.type === "multiple_choice") {
      const correct = q.choices.find((c) => c.isCorrect);
      return correct ? answer === correct._id : false;
    } else if (q.type === "true_false") {
      return answer === q.correctAnswer;
    } else {
      return q.possibleAnswers
        .map((a) => a.toLowerCase())
        .includes(answer?.toLowerCase());
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const answer = answers[q._id];
      if (q.type === "multiple_choice") {
        const correct = q.choices.find((c) => c.isCorrect);
        if (correct && answer === correct._id) total += q.points;
      } else if (q.type === "true_false") {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === "fill_in_blank") {
        if (
          q.possibleAnswers
            .map((a) => a.toLowerCase())
            .includes(answer?.toLowerCase())
        ) {
          total += q.points;
        }
      }
    });
    return total;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    await client.saveQuizAttempt(qid as string, answers, finalScore);
  };

  const renderQuestion = (q: Question) => (
    <div key={q._id} className="border p-4 mb-3">
      <div className="d-flex justify-content-between mb-2">
        <strong>{q.title}</strong>
        <span>{q.points} pts</span>
      </div>
      <p>{q.question}</p>
      {submitted && (
        <div
          className={`alert ${isCorrect(q) ? "alert-success" : "alert-danger"} py-1`}
        >
          {isCorrect(q) ? "✓ Correct" : "✗ Incorrect"}
        </div>
      )}
      {q.type === "multiple_choice" &&
        q.choices.map((choice) => (
          <div
            key={choice._id}
            className="d-flex align-items-center gap-2 mb-2"
          >
            <input
              type="radio"
              name={q._id}
              value={choice._id}
              checked={answers[q._id] === choice._id}
              onChange={() => handleAnswer(q._id, choice._id)}
              disabled={submitted}
            />
            <label>{choice.text}</label>
            {submitted && choice.isCorrect && (
              <span className="text-success ms-2">(Correct)</span>
            )}
          </div>
        ))}
      {q.type === "true_false" &&
        ["true", "false"].map((val) => (
          <div key={val} className="d-flex align-items-center gap-2 mb-2">
            <input
              type="radio"
              name={q._id}
              value={val}
              checked={answers[q._id] === val}
              onChange={() => handleAnswer(q._id, val)}
              disabled={submitted}
            />
            <label>{val.charAt(0).toUpperCase() + val.slice(1)}</label>
            {submitted && q.correctAnswer === val && (
              <span className="text-success ms-2">(Correct)</span>
            )}
          </div>
        ))}
      {q.type === "fill_in_blank" && (
        <div>
          <input
            className="form-control"
            placeholder="Your answer"
            value={answers[q._id] || ""}
            onChange={(e) => handleAnswer(q._id, e.target.value)}
            disabled={submitted}
          />
          {submitted && (
            <div className="text-success mt-1">
              Correct: {q.possibleAnswers.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
  const now = new Date();
  const availableFrom = new Date(quiz.availableFrom);
  const availableUntil = new Date(quiz.availableUntil);
  const isAvailable = now >= availableFrom && now <= availableUntil;

  if (!isAvailable)
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <hr />
        <div className="alert alert-warning">
          {now < availableFrom
            ? `This quiz is not available until ${availableFrom.toLocaleDateString()}`
            : "This quiz is closed."}
        </div>
      </div>
    );

  if (!quiz) return <div>Loading...</div>;
  if (quiz.questions.length === 0)
    return (
      <div className="p-4">
        <h2>{quiz.title}</h2>
        <hr />
        <div className="alert alert-warning">
          This quiz has no questions yet.
        </div>
      </div>
    );
  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && <p>{quiz.description}</p>}
      <hr />
      {submitted && (
        <div className="alert alert-info mb-4">
          <strong>
            Your Score: {score} / {quiz.points}
          </strong>
        </div>
      )}
      {quiz.oneQuestionAtATime && !submitted ? (
        <div>
          {renderQuestion(currentQuestion)}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              ← Previous
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                Next →
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
          </div>
          <div className="mt-3 d-flex gap-2 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q._id}
                className={`btn btn-sm ${i === currentIndex ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setCurrentIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : !submitted ? (
        <div>
          {questions.map((q) => renderQuestion(q))}
          <button className="btn btn-danger mt-3" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>{questions.map((q) => renderQuestion(q))}</div>
      )}
    </div>
  );
}
