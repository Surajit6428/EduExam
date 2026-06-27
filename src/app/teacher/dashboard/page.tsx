import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function TeacherDashboard() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "TEACHER"
  ) {
    redirect("/login");
  }

  const totalQuizzes =
    await prisma.quiz.count();

  const totalStudents =
    await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

  const totalAssignments =
    await prisma.assignment.count();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
        <h3>Total Quizzes</h3>

        <p className="mt-4 text-4xl font-bold">
          {totalQuizzes}
        </p>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
        <h3>Total Students</h3>

        <p className="mt-4 text-4xl font-bold">
          {totalStudents}
        </p>
      </div>

      <div className="rounded-2xl bg-purple-600 p-6 text-white shadow">
        <h3>Assignments</h3>

        <p className="mt-4 text-4xl font-bold">
          {totalAssignments}
        </p>
      </div>

    </div>
  );
}