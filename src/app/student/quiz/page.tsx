import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentQuizPage() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "STUDENT"
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
      <h1 className="mb-6 text-3xl font-bold">
        Available Quizzes
      </h1>

      <div className="grid gap-4">

        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-2xl border bg-white p-6 shadow"
          >
            <h2 className="text-xl font-semibold">
              {quiz.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {quiz.description}
            </p>

            <Link
              href={`/student/quiz/${quiz.id}`}
              className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
            >
              Start Quiz
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}