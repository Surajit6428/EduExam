"use client";

export default function ApproveButton({
  userId,
}: {
  userId: string;
}) {
  const handleApprove =
    async () => {
      const res =
        await fetch(
          "/api/admin/approve-user",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          }
        );

      if (res.ok) {
        window.location.reload();
      }
    };

  return (
    <button
      onClick={handleApprove}
      className="rounded bg-green-600 px-3 py-1 text-sm text-white"
    >
      Approve
    </button>
  );
}