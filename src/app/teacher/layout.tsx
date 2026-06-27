import TeacherLayout from "@/components/layout/teacher-layout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherLayout>
      {children}
    </TeacherLayout>
  );
}