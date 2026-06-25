"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/common/back-button";
export default function QuizQuestionsPage() {
  const params = useParams();

  const [question, setQuestion] =
    useState("");

  const [optionA, setOptionA] =
    useState("");

  const [optionB, setOptionB] =
    useState("");

  const [optionC, setOptionC] =
    useState("");

  const [optionD, setOptionD] =
    useState("");

  const [
    correctAnswer,
    setCorrectAnswer,
  ] = useState("A");

  const [loading, setLoading] =
    useState(false);

 const handleSubmit = async () => {

  if (
    !question.trim() ||
    !optionA.trim() ||
    !optionB.trim() ||
    !optionC.trim() ||
    !optionD.trim()
  ) {
    alert(
      "Please fill all fields"
    );
    return;
  }
  try {
    setLoading(true);

      const res = await fetch(
        "/api/teacher/question/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            quizId: params.id,
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          "Failed to save question"
        );
        return;
      }

      alert(
        "Question Saved Successfully"
      );

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("A");
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="mx-auto max-w-4xl p-6">

    <div className="mb-4">
      <BackButton />
    </div>

    <h1 className="mb-6 text-3xl font-bold">
      Add Question
    </h1>

      <div className="space-y-4 rounded-2xl border bg-white p-6 shadow">
        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Enter Question"
        />

        <input
          value={optionA}
          onChange={(e) =>
            setOptionA(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Option A"
        />

        <input
          value={optionB}
          onChange={(e) =>
            setOptionB(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Option B"
        />

        <input
          value={optionC}
          onChange={(e) =>
            setOptionC(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Option C"
        />

        <input
          value={optionD}
          onChange={(e) =>
            setOptionD(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Option D"
        />

        <select
          value={correctAnswer}
          onChange={(e) =>
            setCorrectAnswer(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="A">
            Option A
          </option>

          <option value="B">
            Option B
          </option>

          <option value="C">
            Option C
          </option>

          <option value="D">
            Option D
          </option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {loading
            ? "Saving..."
            : "Save Question"}
        </button>
      </div>
    </div>
  );
}