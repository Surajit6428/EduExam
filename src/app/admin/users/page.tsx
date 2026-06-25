import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ApproveButton from "@/components/admin/approve-button";
import StatusButton from "@/components/admin/status-button";
export default async function UsersPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        User Management
      </h1>

      <div className="overflow-x-auto rounded-2xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Mobile
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t"
              >
                <td className="p-4">
  <Link
    href={`/admin/users/${user.id}`}
    className="font-medium text-blue-600 hover:underline"
  >
    {user.firstName}{" "}
    {user.lastName}
  </Link>
</td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.mobile}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : user.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

             <td className="p-4 space-x-2">
  {user.status === "PENDING" ? (
    <ApproveButton
      userId={user.id}
    />
  ) : user.status === "ACTIVE" ? (
    <StatusButton
      userId={user.id}
      status="BLOCKED"
    />
  ) : (
    <StatusButton
      userId={user.id}
      status="ACTIVE"
    />
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}