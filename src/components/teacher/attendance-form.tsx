"use client";

import { useState } from "react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function AttendanceForm({
  students,
}: {
  students: Student[];
}) {
  const [attendance, setAttendance] =
    useState<
      Record<
        string,
        "PRESENT" | "ABSENT"
      >
    >({});

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    studentId: string,
    status: "PRESENT" | "ABSENT"
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/teacher/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            attendance,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Failed"
        );

        setLoading(false);
        return;
      }

      alert(
        "Attendance Saved Successfully"
      );

      setAttendance({});
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border bg-white shadow">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Student
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-center">
              Present
            </th>

            <th className="p-4 text-center">
              Absent
            </th>

          </tr>

        </thead>

        <tbody>

          {students.map(
            (student) => (
              <tr
                key={student.id}
                className="border-t"
              >

                <td className="p-4">
                  {student.firstName}{" "}
                  {student.lastName}
                </td>

                <td className="p-4">
                  {student.email}
                </td>

                <td className="p-4 text-center">
                  <input
                    type="radio"
                    name={student.id}
                    checked={
                      attendance[
                        student.id
                      ] ===
                      "PRESENT"
                    }
                    onChange={() =>
                      handleChange(
                        student.id,
                        "PRESENT"
                      )
                    }
                  />
                </td>

                <td className="p-4 text-center">
                  <input
                    type="radio"
                    name={student.id}
                    checked={
                      attendance[
                        student.id
                      ] ===
                      "ABSENT"
                    }
                    onChange={() =>
                      handleChange(
                        student.id,
                        "ABSENT"
                      )
                    }
                  />
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

      <div className="p-6">

        <button
          onClick={
            handleSubmit
          }
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : "Save Attendance"}
        </button>

      </div>

    </div>
  );
}