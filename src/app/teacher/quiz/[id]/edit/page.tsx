"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditQuizPage() {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    const res = await fetch(
      `/api/teacher/quiz/${params.id}`
    );

    const data = await res.json();

    setTitle(data.title);
    setDescription(
      data.description || ""
    );
  };

  const handleUpdate = async () => {
    const res = await fetch(
      "/api/teacher/quiz/update",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          title,
          description,
        }),
      }
    );

    if (res.ok) {
      alert("Quiz Updated");

      router.push(
        "/teacher/quiz"
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Quiz
      </h1>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
          rows={5}
        />

        <button
          onClick={handleUpdate}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Update Quiz
        </button>

      </div>
    </div>
  );
}