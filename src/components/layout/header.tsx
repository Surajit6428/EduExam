import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";

export default async function Header() {
  const user =
    await getCurrentUser();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div>
        <h1 className="text-2xl font-bold">
          {user?.role === "ADMIN"
            ? "Admin Dashboard"
            : user?.role === "TEACHER"
            ? "Teacher Dashboard"
            : user?.role === "STUDENT"
            ? "Student Dashboard"
            : "Parent Dashboard"}
        </h1>

        <p className="text-sm text-gray-500">
          Welcome Back{" "}
          {user?.firstName}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <LogoutButton />

        <div className="text-right">
          <p className="font-semibold">
            {user?.firstName}{" "}
            {user?.lastName}
          </p>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
          {user?.firstName?.charAt(0)}
        </div>

      </div>

    </header>
  );
}