import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      role,
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      gender,
      dob,
      address,
      password,
    } = body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { mobile },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or Mobile already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const totalUsers = await prisma.user.count();

    let prefix = "USR";

    if (role === "STUDENT") prefix = "STU";
    if (role === "TEACHER") prefix = "TCH";
    if (role === "PARENT") prefix = "PAR";

    const uniqueId =
      `${prefix}-${new Date().getFullYear()}-${String(
        totalUsers + 1
      ).padStart(4, "0")}`;

   const user = await prisma.user.create({
  data: {
    uniqueId,
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    gender,
    dob: new Date(dob),
    address,
    password: hashedPassword,
    role,
    status: "PENDING",
  },
});

    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (role === "TEACHER") {
      await prisma.teacher.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (role === "PARENT") {
      await prisma.parent.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      uniqueId,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}