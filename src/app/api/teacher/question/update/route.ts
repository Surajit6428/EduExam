import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request
) {
  try {
    const {
      id,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    } = await req.json();

    await prisma.question.update({
      where: {
        id,
      },
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
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