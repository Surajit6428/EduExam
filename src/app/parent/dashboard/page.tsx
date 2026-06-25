import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function ParentDashboard() {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.role !== "PARENT"
  ) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Parent Dashboard
      </h1>
    </div>
  );
}