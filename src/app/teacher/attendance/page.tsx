import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AttendanceForm from "@/components/teacher/attendance-form";

export default async function TeacherAttendancePage() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "TEACHER"
  ) {
    redirect("/login");
  }

  const students =
    await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
      orderBy: {
        firstName: "asc",
      },
    });

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayAttendance =
    await prisma.attendance.findFirst({
      where: {
        date: today,
      },
    });

  const todayRecords =
    await prisma.attendance.findMany({
      where: {
        date: today,
      },
    });

  const totalStudents =
    students.length;

  const presentCount =
    todayRecords.filter(
      (record) =>
        record.status ===
        "PRESENT"
    ).length;

  const absentCount =
    todayRecords.filter(
      (record) =>
        record.status ===
        "ABSENT"
    ).length;

  const attendancePercentage =
    totalStudents > 0
      ? (
          (presentCount /
            totalStudents) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Take Attendance
      </h1>

      <div
        className={`mb-6 rounded-2xl p-5 text-white shadow ${
          todayAttendance
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        <h2 className="text-xl font-bold">
          Today's Attendance
        </h2>

        <p className="mt-2">
          {todayAttendance
            ? "✅ Attendance Already Taken"
            : "❌ Attendance Not Taken Yet"}
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <h3>Total Students</h3>

          <p className="mt-4 text-4xl font-bold">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-white shadow">
          <h3>Present</h3>

          <p className="mt-4 text-4xl font-bold">
            {presentCount}
          </p>
        </div>

        <div className="rounded-2xl bg-red-600 p-6 text-white shadow">
          <h3>Absent</h3>

          <p className="mt-4 text-4xl font-bold">
            {absentCount}
          </p>
        </div>

        <div className="rounded-2xl bg-purple-600 p-6 text-white shadow">
          <h3>Attendance %</h3>

          <p className="mt-4 text-4xl font-bold">
            {attendancePercentage}%
          </p>
        </div>

      </div>

      <AttendanceForm
        students={students}
      />

    </div>
  );
}