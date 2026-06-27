import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      title,
      description,
      dueDate,
    } = await req.json();

    if (
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

    await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Assignment created successfully",
    });
  } catch (error) {
    console.log(
      "CREATE ASSIGNMENT ERROR:",
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