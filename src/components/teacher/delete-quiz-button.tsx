"use client";

import { useRouter } from "next/navigation";

export default function DeleteQuizButton({
  quizId,
}: {
  quizId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm(
      "Delete this quiz?"
    );

    if (!ok) return;

    const res = await fetch(
      "/api/teacher/quiz/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: quizId,
        }),
      }
    );

    if (res.ok) {
      alert(
        "Quiz Deleted Successfully"
      );

      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  );
}