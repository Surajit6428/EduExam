import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Params
) {
  const { id } = await params;

  const question =
    await prisma.question.findUnique({
      where: {
        id,
      },
    });

  return NextResponse.json(
    question
  );
}