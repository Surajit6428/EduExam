import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { login, password } = body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: login },
          { mobile: login },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Account not registered. Please register first.",
        },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 400 }
      );
    }

    if (
      user.role === "TEACHER" &&
      user.status === "PENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Waiting for Admin Approval",
        },
        { status: 403 }
      );
    }
    if (
  user.status === "BLOCKED"
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Your account has been blocked by Admin",
    },
    { status: 403 }
  );
}

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      role: user.role,
      uniqueId: user.uniqueId,
      name:
        user.firstName +
        " " +
        user.lastName,
    });

  response.cookies.set(
  "token",
  token,
  {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  }
);

console.log(
  "TOKEN SET SUCCESS"
);

    return response;
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