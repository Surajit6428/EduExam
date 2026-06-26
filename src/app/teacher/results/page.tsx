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
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const totalAttempts =
    attempts.length;

  const highestScore =
    attempts.length > 0
      ? Math.max(
          ...attempts.map(
            (a) => a.score
          )
        )
      : 0;

  const averageScore =
    attempts.length > 0
      ? (
          attempts.reduce(
            (sum, a) =>
              sum + a.score,
            0
          ) / attempts.length
        ).toFixed(1)
      : "0";

  const passCount =
    attempts.filter(
      (a) => a.score >= 5
    ).length;

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Student Quiz Results
      </h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <h3>Total Attempts</h3>

          <p className="mt-4 text-4xl font-bold">
            {totalAttempts}
          </p>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
          <h3>Highest Score</h3>

          <p className="mt-4 text-4xl font-bold">
            {highestScore}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-500 p-6 text-white shadow">
          <h3>Average Score</h3>

          <p className="mt-4 text-4xl font-bold">
            {averageScore}
          </p>
        </div>

        <div className="rounded-2xl bg-purple-600 p-6 text-white shadow">
          <h3>Passed Students</h3>

          <p className="mt-4 text-4xl font-bold">
            {passCount}
          </p>
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Quiz
              </th>

              <th className="p-4 text-left">
                Score
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {attempts.length > 0 ? (
              attempts.map(
                (attempt) => (
                  <tr
                    key={attempt.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">

                      <div className="font-semibold">
                        {attempt.student.firstName}{" "}
                        {attempt.student.lastName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {attempt.student.email}
                      </div>

                    </td>

                    <td className="p-4">
                      {attempt.quiz.title}
                    </td>

                    <td className="p-4 font-bold text-blue-600">
                      {attempt.score}
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

                    <td className="p-4">
                      {new Date(
                        attempt.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={5}
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