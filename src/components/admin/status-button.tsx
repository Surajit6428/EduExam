"use client";

export default function StatusButton({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const handleClick =
    async () => {
      const res =
        await fetch(
          "/api/admin/update-user-status",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId,
              status,
            }),
          }
        );

      if (res.ok) {
        window.location.reload();
      }
    };

  return (
    <button
      onClick={handleClick}
      className={`rounded px-3 py-1 text-sm text-white ${
        status === "ACTIVE"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {status === "ACTIVE"
        ? "Activate"
        : "Block"}
    </button>
  );
}