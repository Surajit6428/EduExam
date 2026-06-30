"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AttendanceRecord {
  studentId: string;
  status: "PRESENT" | "ABSENT";
}

interface Props {
  students: Student[];
  existingAttendance: AttendanceRecord[];
}

export default function AttendanceForm({
  students,
  existingAttendance,
}: Props) {
  const router = useRouter();

  const [attendance, setAttendance] =
    useState<
      Record<string, "PRESENT" | "ABSENT">
    >({});

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const data: Record<
      string,
      "PRESENT" | "ABSENT"
    > = {};

    existingAttendance.forEach((item) => {
      data[item.studentId] = item.status;
    });

    setAttendance(data);
  }, [existingAttendance]);

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
        alert(data.message);
        setLoading(false);
        return;
      }

      alert(data.message);

      router.refresh();
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong."
      );
    }

    setLoading(false);
  };

  const isUpdate =
    existingAttendance.length > 0;

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

          {students.map((student) => (
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
                    ] === "PRESENT"
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
                    ] === "ABSENT"
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
          ))}

        </tbody>

      </table>

      <div className="p-6">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {loading
            ? "Saving..."
            : isUpdate
            ? "Update Attendance"
            : "Save Attendance"}
        </button>

      </div>

    </div>
  );
}