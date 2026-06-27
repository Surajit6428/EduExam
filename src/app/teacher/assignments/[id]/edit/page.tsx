"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAssignmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [dueDate, setDueDate] =
    useState("");

  const loadAssignment = async () => {
    try {
      const res = await fetch(
        `/api/teacher/assignments/${id}`
      );

      if (!res.ok) {
        alert("Assignment not found");
        return;
      }

      const data = await res.json();

      setTitle(data.title);
      setDescription(
        data.description || ""
      );

      setDueDate(
        new Date(data.dueDate)
          .toISOString()
          .split("T")[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadAssignment();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "/api/teacher/assignments/update",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            description,
            dueDate,
          }),
        }
      );

      if (!res.ok) {
        alert(
          "Failed to update assignment"
        );
        return;
      }

      alert(
        "Assignment Updated Successfully"
      );

      router.push(
        "/teacher/assignments"
      );
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Assignment
      </h1>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded-lg border p-3"
          placeholder="Assignment Title"
        />

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
          placeholder="Description"
        />

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

        <button
          onClick={handleUpdate}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Update Assignment
        </button>

      </div>

    </div>
  );
}