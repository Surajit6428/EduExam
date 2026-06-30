import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentAssignmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/login");
  }

  const assignments =
    await prisma.assignment.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        My Assignments
      </h1>

      <div className="grid gap-6">

        {assignments.length > 0 ? (
          assignments.map(
            (assignment) => (
              <div
                key={assignment.id}
                className="rounded-2xl border bg-white p-6 shadow"
              >
                <h2 className="text-2xl font-bold">
                  {assignment.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {assignment.description}
                </p>

                <p className="mt-4 text-sm text-red-600">
                  Due Date :{" "}
                  {new Date(
                    assignment.dueDate
                  ).toLocaleDateString()}
                </p>

                <div className="mt-6">

                  <Link
                    href={`/student/assignments/${assignment.id}`}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white"
                  >
                    View Assignment
                  </Link>

                </div>

              </div>
            )
          )
        ) : (
          <div className="rounded-2xl border bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold">
              No Assignments Available
            </h2>

            <p className="mt-3 text-gray-500">
              Your teacher has not created any assignments yet.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}