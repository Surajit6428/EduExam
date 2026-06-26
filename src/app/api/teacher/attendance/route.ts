import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { attendance } = await req.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // আজকের কোনো attendance আগে থেকেই আছে কিনা
    const existingAttendance =
      await prisma.attendance.findFirst({
        where: {
          date: today,
        },
      });

    if (existingAttendance) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Attendance has already been taken for today.",
        },
        {
          status: 400,
        }
      );
    }

    // Save Attendance
    for (const studentId in attendance) {
      await prisma.attendance.create({
        data: {
          studentId,
          status: attendance[studentId],
          date: today,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Attendance saved successfully.",
    });
  } catch (error) {
    console.log(
      "ATTENDANCE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}