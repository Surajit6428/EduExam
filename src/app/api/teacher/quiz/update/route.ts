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
    } = await req.json();

    await prisma.quiz.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}