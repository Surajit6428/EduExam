import Header from "./header";
import TeacherSidebar from "./teacher-sidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}