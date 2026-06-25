import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CalendarCheck,
  BookOpen,
  Trophy,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Quiz",
    href: "/teacher/quiz",
    icon: ClipboardList,
  },
  {
    name: "Students",
    href: "/teacher/students",
    icon: Users,
  },
  {
    name: "Attendance",
    href: "/teacher/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Assignments",
    href: "/teacher/assignments",
    icon: BookOpen,
  },
  {
    name: "Results",
    href: "/teacher/results",
    icon: Trophy,
  },
];

export default function TeacherSidebar() {
  return (
    <aside className="h-screen w-72 border-r bg-slate-950 text-white">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-3xl font-bold">
          Teacher Panel
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          EduExam Pro
        </p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}