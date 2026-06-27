import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteAssignmentButton from "@/components/teacher/delete-assignment-button";

export default async function AssignmentsPage() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "TEACHER"
  ) {
    redirect("/login");
  }

  const assignments =
    await prisma.assignment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Assignments
        </h1>

        <Link
          href="/teacher/assignments/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Create Assignment
        </Link>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Due Date
              </th>

              <th className="p-4 text-left">
                Created
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.length > 0 ? (
              assignments.map(
                (assignment) => (
                  <tr
                    key={assignment.id}
                    className="border-t"
                  >
                    <td className="p-4 font-medium">
                      {assignment.title}
                    </td>

                    <td className="p-4">
                      {new Date(
                        assignment.dueDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {new Date(
                        assignment.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center">

                      <div className="flex justify-center gap-3">

                        <Link
                          href={`/teacher/assignments/${assignment.id}/edit`}
                          className="rounded bg-yellow-500 px-4 py-2 text-white"
                        >
                          Edit
                        </Link>

                        <DeleteAssignmentButton id={assignment.id}/>

                      </div>

                    </td>

                  </tr>
                )
              )
            ) : (
              <tr>

                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  No Assignments Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}