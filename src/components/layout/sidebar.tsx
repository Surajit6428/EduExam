import Link from "next/link";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  ClipboardList,
  CalendarCheck,
  BookOpen,
  BarChart3,
  CreditCard,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Teachers",
    href: "/admin/teachers",
    icon: GraduationCap,
  },
  {
    name: "Students",
    href: "/admin/students",
    icon: UserCheck,
  },
  {
    name: "Parents",
    href: "/admin/parents",
    icon: Users,
  },
  {
    name: "Quiz",
    href: "/admin/quiz",
    icon: ClipboardList,
  },
  {
    name: "Attendance",
    href: "/admin/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Assignments",
    href: "/admin/assignments",
    icon: BookOpen,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Subscription",
    href: "/admin/subscription",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 border-r bg-slate-950 text-white">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-3xl font-bold">
          EduExam Pro
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Developed By SB Designer
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