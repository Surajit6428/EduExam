import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentResultsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/login");
  }

  const attempts =
    await prisma.quizAttempt.findMany({
      where: {
        studentId: user.id,
      },
      include: {
        quiz: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        My Results
      </h1>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Quiz
              </th>

              <th className="p-4 text-left">
                Score
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {attempts.length > 0 ? (
              attempts.map((attempt) => (
                <tr
                  key={attempt.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {attempt.quiz.title}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-green-600">
                      {attempt.score}/10
                    </div>

                    <div className="text-sm text-gray-500">
                      {Math.round(
                        (attempt.score / 10) * 100
                      )}
                      %
                    </div>
                  </td>

                  <td className="p-4">
                    {new Date(
                      attempt.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {attempt.score >= 5 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        PASS
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        FAIL
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  No Results Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}