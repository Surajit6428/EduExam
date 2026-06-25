import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({
  params,
}: PageProps) {
  const admin =
    await getCurrentUser();

  if (
    !admin ||
    admin.role !== "ADMIN"
  ) {
    redirect("/login");
  }

  const { id } =
    await params;

  const user =
    await prisma.user.findUnique({
      where: {
        id,
      },
    });

  if (!user) {
    return (
      <div className="p-10">
        User Not Found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        User Details
      </h1>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Unique ID
            </p>
            <p className="font-semibold">
              {user.uniqueId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>
            <p className="font-semibold">
              {user.firstName}{" "}
              {user.middleName ?? ""}{" "}
              {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>
            <p className="font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Mobile
            </p>
            <p className="font-semibold">
              {user.mobile}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>
            <p className="font-semibold">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>
            <p className="font-semibold">
              {user.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Gender
            </p>
            <p className="font-semibold">
              {user.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Date of Birth
            </p>
            <p className="font-semibold">
              {new Date(
                user.dob
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">
              Address
            </p>
            <p className="font-semibold">
              {user.address}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created At
            </p>
            <p className="font-semibold">
              {new Date(
                user.createdAt
              ).toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}