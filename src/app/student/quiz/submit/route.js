import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const {
      quizId,
      studentId,
      answers,
    } = await req.json();

    const questions =
      await prisma.question.findMany({
        where: {
          quizId,
        },
      });
      const questions =
  await prisma.question.findMany({
    where: {
      quizId,
    },
  });

const existingAttempt =
  await prisma.quizAttempt.findFirst({
    where: {
      quizId,
      studentId,
    },
  });

if (existingAttempt) {
  return NextResponse.json(
    {
      success: false,
      message:
        "You have already attempted this quiz",
    },
    {
      status: 400,
    }
  );
}

let score = 0;

    let score = 0;

    for (const question of questions) {
      const selectedAnswer =
        answers[question.id];

      if (
        selectedAnswer ===
        question.correctAnswer
      ) {
        score++;
      }
    }

    await prisma.quizAttempt.create({
      data: {
        quizId,
        studentId,
        score,
      },
    });

    return NextResponse.json({
      success: true,
      score,
      total:
        questions.length,
    });
  } catch (error) {
    console.log(
      "QUIZ SUBMIT ERROR:",
      error
    );

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