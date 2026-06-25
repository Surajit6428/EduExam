"use client";

import { useState } from "react";
import BackButton from "@/components/common/back-button";

export default function CreateQuizPage() {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/teacher/quiz/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          "Failed to create quiz"
        );
        return;
      }

      alert(
        "Quiz Created Successfully"
      );

      window.location.href =
        "/teacher/quiz";
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
    <div className="mx-auto max-w-3xl p-6">
  <div className="mb-4">
    <BackButton />
  </div>

  <h1 className="mb-6 text-3xl font-bold">
    Create Quiz
  </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Quiz Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            placeholder="Enter Quiz Title"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            placeholder="Quiz Description"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {loading
            ? "Creating..."
            : "Create Quiz"}
        </button>
      </form>
    </div>
  );
}