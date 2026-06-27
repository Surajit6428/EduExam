"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAssignmentPage() {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/teacher/assignments/create",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            dueDate,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed to create assignment"
        );

        return;
      }

      alert(
        "Assignment Created Successfully"
      );

      router.push(
        "/teacher/assignments"
      );
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

      <h1 className="mb-6 text-3xl font-bold">
        Create Assignment
      </h1>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Assignment Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            placeholder="Enter assignment title"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            placeholder="Enter assignment description"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Assignment"}
        </button>

      </div>

    </div>
  );
}