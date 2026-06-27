import StudentLayout from "@/components/layout/student-layout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentLayout>
      {children}
    </StudentLayout>
  );
}