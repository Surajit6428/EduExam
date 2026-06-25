"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Props {
  quizId: string;
  studentId: string;
  questions: Question[];
}

export default function QuizAttemptForm({
  quizId,
  studentId,
  questions,
}: Props) {
  const router = useRouter();

  const [answers, setAnswers] =
    useState<Record<string, string>>(
      {}
    );

  const [loading, setLoading] =
    useState(false);

  const handleSelect = (
    questionId: string,
    answer: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        "/api/student/quiz/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            quizId,
            studentId,
            answers,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed to submit quiz"
        );

        setLoading(false);
        return;
      }

      alert(
        `Your Score: ${data.score}/${data.total}`
      );

      router.replace(
        "/student/results"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );

      setLoading(false);
    }
  };

  return (
    <>
      {questions.map(
        (question, index) => (
          <div
            key={question.id}
            className="mb-6 rounded-2xl border bg-white p-6 shadow"
          >
            <h3 className="mb-4 font-semibold">
              Q{index + 1}.{" "}
              {question.question}
            </h3>

            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  name={question.id}
                  onChange={() =>
                    handleSelect(
                      question.id,
                      "A"
                    )
                  }
                />{" "}
                {question.optionA}
              </label>

              <label className="block">
                <input
                  type="radio"
                  name={question.id}
                  onChange={() =>
                    handleSelect(
                      question.id,
                      "B"
                    )
                  }
                />{" "}
                {question.optionB}
              </label>

              <label className="block">
                <input
                  type="radio"
                  name={question.id}
                  onChange={() =>
                    handleSelect(
                      question.id,
                      "C"
                    )
                  }
                />{" "}
                {question.optionC}
              </label>

              <label className="block">
                <input
                  type="radio"
                  name={question.id}
                  onChange={() =>
                    handleSelect(
                      question.id,
                      "D"
                    )
                  }
                />{" "}
                {question.optionD}
              </label>
            </div>
          </div>
        )
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-lg bg-green-600 px-6 py-3 text-white transition disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading
          ? "Submitting..."
          : "Submit Quiz"}
      </button>
    </>
  );
}