import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteQuizButton from "@/components/teacher/delete-quiz-button";

export default async function QuizPage() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "TEACHER"
  ) {
    redirect("/login");
  }

  const quizzes =
    await prisma.quiz.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Quiz Management
        </h1>

        <Link
          href="/teacher/quiz/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Create Quiz
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Created
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((quiz) => (
              <tr
                key={quiz.id}
                className="border-t"
              >
                <td className="p-4 font-medium">
                  {quiz.title}
                </td>

                <td className="p-4">
                  {quiz.description}
                </td>

                <td className="p-4">
                  {new Date(
                    quiz.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <Link
                      href={`/teacher/quiz/${quiz.id}`}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white"
                    >
                      View
                    </Link>

                    <Link
                      href={`/teacher/quiz/${quiz.id}/questions`}
                      className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                    >
                      Add Questions
                    </Link>

                    <Link
                      href={`/teacher/quiz/${quiz.id}/edit`}
                      className="rounded bg-yellow-500 px-3 py-1 text-sm text-white"
                    >
                      Edit
                    </Link>

                    <DeleteQuizButton
                      quizId={quiz.id}
                    />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}