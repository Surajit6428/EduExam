import DashboardLayout from "@/components/layout/dashboard-layout";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const totalUsers =
    await prisma.user.count();

  const totalTeachers =
    await prisma.user.count({
      where: {
        role: "TEACHER",
      },
    });

  const totalStudents =
    await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

  const totalParents =
    await prisma.user.count({
      where: {
        role: "PARENT",
      },
    });

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <h3>Total Users</h3>
          <p className="mt-4 text-4xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
          <h3>Teachers</h3>
          <p className="mt-4 text-4xl font-bold">
            {totalTeachers}
          </p>
        </div>

        <div className="rounded-2xl bg-purple-600 p-6 text-white shadow">
          <h3>Students</h3>
          <p className="mt-4 text-4xl font-bold">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-600 p-6 text-white shadow">
          <h3>Parents</h3>
          <p className="mt-4 text-4xl font-bold">
            {totalParents}
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}