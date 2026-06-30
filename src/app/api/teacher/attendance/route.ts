import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { attendance } = await req.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const studentId in attendance) {
      const existing =
        await prisma.attendance.findFirst({
          where: {
            studentId,
            date: today,
          },
        });

      if (existing) {
        await prisma.attendance.update({
          where: {
            id: existing.id,
          },
          data: {
            status:
              attendance[studentId],
          },
        });
      } else {
        await prisma.attendance.create({
          data: {
            studentId,
            status:
              attendance[studentId],
            date: today,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Attendance Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}