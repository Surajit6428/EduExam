import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, status } =
      await req.json();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status,
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
      { status: 500 }
    );
  }
}