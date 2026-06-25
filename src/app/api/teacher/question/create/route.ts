import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      quizId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    } = await req.json();

    if (
      !quizId ||
      !question?.trim() ||
      !optionA?.trim() ||
      !optionB?.trim() ||
      !optionC?.trim() ||
      !optionD?.trim() ||
      !correctAnswer
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields are required",
        },
        { status: 400 }
      );
    }

    await prisma.question.create({
      data: {
        quizId,
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
      message:
        "Question Saved Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}