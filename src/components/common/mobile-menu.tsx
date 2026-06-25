"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="mr-4 text-2xl"
      >
        ☰
      </button>

      {open && (
        <>
          <div
            onClick={() =>
              setOpen(false)
            }
            className="fixed inset-0 z-40 bg-black/50"
          />

          <div className="fixed left-0 top-0 z-50 h-full w-72 bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                EduExam Pro
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-4">

              <Link
                href="/student/dashboard"
                className="block rounded p-3 hover:bg-slate-100"
                onClick={() =>
                  setOpen(false)
                }
              >
                📊 Dashboard
              </Link>

              <Link
                href="/student/quiz"
                className="block rounded p-3 hover:bg-slate-100"
                onClick={() =>
                  setOpen(false)
                }
              >
                📝 Quizzes
              </Link>

              <Link
                href="/student/results"
                className="block rounded p-3 hover:bg-slate-100"
                onClick={() =>
                  setOpen(false)
                }
              >
                📈 Results
              </Link>

              <Link
                href="/student/profile"
                className="block rounded p-3 hover:bg-slate-100"
                onClick={() =>
                  setOpen(false)
                }
              >
                👤 Profile
              </Link>

            </nav>
          </div>
        </>
      )}
    </>
  );
}