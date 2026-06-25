"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditQuestionPage() {
  const params = useParams();
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] =
    useState("A");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    const res = await fetch(
      `/api/teacher/question/${params.id}`
    );

    const data = await res.json();

    setQuestion(data.question);
    setOptionA(data.optionA);
    setOptionB(data.optionB);
    setOptionC(data.optionC);
    setOptionD(data.optionD);
    setCorrectAnswer(data.correctAnswer);
  };

  const handleUpdate = async () => {
    const res = await fetch(
      "/api/teacher/question/update",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
        }),
      }
    );

    if (res.ok) {
      alert(
        "Question Updated Successfully"
      );

      router.back();
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Question
      </h1>

      <div className="space-y-4 rounded-2xl border bg-white p-6 shadow">

        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          value={optionA}
          onChange={(e) =>
            setOptionA(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          value={optionB}
          onChange={(e) =>
            setOptionB(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          value={optionC}
          onChange={(e) =>
            setOptionC(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          value={optionD}
          onChange={(e) =>
            setOptionD(e.target.value)
          }
          className="w-full rounded-lg border p-3"
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
          onClick={handleUpdate}
          disabled={loading}
          className="rounded bg-blue-600 px-6 py-3 text-white"
        >
          Update Question
        </button>

      </div>
    </div>
  );
}