import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request
) {
  try {
    const { id } = await req.json();

    console.log("Deleting:", id);

    await prisma.question.delete({
      where: {
        id,
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