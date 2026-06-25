import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")
        ?.value;

    if (!token) {
      return null;
    }

    const payload =
      verifyToken(token) as {
        id: string;
        role: string;
      };

    const user =
      await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

    return user;
  } catch {
    return null;
  }
}