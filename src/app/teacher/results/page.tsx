import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function TeacherResultsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "TEACHER") {
    redirect("/login");
  }

  const attempts =
    await prisma.quizAttempt.findMany({
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
        Quiz Results
      </h1>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Quiz
              </th>

              <th className="p-4 text-left">
                Student ID
              </th>

              <th className="p-4 text-left">
                Score
              </th>

              <th className="p-4 text-left">
                Date
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
                    {attempt.studentId}
                  </td>

                  <td className="p-4 font-bold text-green-600">
                    {attempt.score}
                  </td>

                  <td className="p-4">
                    {new Date(
                      attempt.createdAt
                    ).toLocaleDateString()}
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