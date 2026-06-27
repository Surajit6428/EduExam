import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request
) {
  try {
    const {
      id,
      title,
      description,
      dueDate,
    } = await req.json();

    if (
      !id ||
      !title ||
      !description ||
      !dueDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.assignment.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Assignment updated successfully",
    });
  } catch (error) {
    console.log(
      "UPDATE ASSIGNMENT ERROR:",
      error
    );

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