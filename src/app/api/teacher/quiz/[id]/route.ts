import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const quiz =
      await prisma.quiz.findUnique({
        where: {
          id,
        },
      });

    if (!quiz) {
      return NextResponse.json(
        {
          message:
            "Quiz not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      quiz
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}