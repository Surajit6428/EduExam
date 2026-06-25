import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Trophy,
  CalendarCheck,
  BookOpen,
  User,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Quizzes",
    href: "/student/quiz",
    icon: ClipboardList,
  },
  {
    name: "My Results",
    href: "/student/results",
    icon: Trophy,
  },
  {
    name: "Attendance",
    href: "/student/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Assignments",
    href: "/student/assignments",
    icon: BookOpen,
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: User,
  },
];

export default function StudentSidebar() {
  return (
    <aside className="h-screen w-72 border-r bg-slate-950 text-white">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-3xl font-bold">
          Student Panel
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