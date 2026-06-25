"use client";

import { useRouter } from "next/navigation";

export default function DeleteQuestionButton({
  questionId,
}: {
  questionId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm(
      "Delete this question?"
    );

    if (!ok) return;

    const res = await fetch(
      "/api/teacher/question/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: questionId,
        }),
      }
    );

    if (res.ok) {
      alert(
        "Question Deleted Successfully"
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