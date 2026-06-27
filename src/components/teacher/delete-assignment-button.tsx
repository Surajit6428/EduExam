"use client";

import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DeleteAssignmentButton({
  id,
}: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        "/api/teacher/assignments/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed to delete assignment"
        );
        return;
      }

      alert(
        "Assignment deleted successfully."
      );

      router.refresh();
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong."
      );
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}