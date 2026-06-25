import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentDashboard() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "STUDENT"
  ) {
    redirect("/login");
  }

  const totalQuizzes =
    await prisma.quiz.count();

  return (
    <div className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Student Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Link href="/student/quiz">
          <div className="cursor-pointer rounded-2xl bg-blue-600 p-6 text-white shadow transition hover:scale-105">
            <h3 className="text-lg font-semibold">
              Available Quizzes
            </h3>

            <p className="mt-4 text-4xl font-bold">
              {totalQuizzes}
            </p>

            <p className="mt-2 text-sm">
              Click to Start Quiz
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}