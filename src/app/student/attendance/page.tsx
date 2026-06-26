import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentAttendancePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/login");
  }

  const records =
    await prisma.attendance.findMany({
      where: {
        studentId: user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

  const presentCount =
    records.filter(
      (record) =>
        record.status === "PRESENT"
    ).length;

  const absentCount =
    records.filter(
      (record) =>
        record.status === "ABSENT"
    ).length;

  const percentage =
    records.length > 0
      ? (
          (presentCount /
            records.length) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        My Attendance
      </h1>

      <div className="mb-8 grid gap-6 md:grid-cols-3">

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

        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
          <h3>Attendance %</h3>

          <p className="mt-4 text-4xl font-bold">
            {percentage}%
          </p>
        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {records.length > 0 ? (
              records.map(
                (record) => (
                  <tr
                    key={record.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {new Date(
                        record.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {record.status ===
                      "PRESENT" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                          Present
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="p-6 text-center text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}