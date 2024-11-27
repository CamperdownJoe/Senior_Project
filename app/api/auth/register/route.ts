import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { isPasswordStrong } from "@/lib/passwordUtils";
import { rateLimit } from "@/lib/rateLimit";

const limiter = rateLimit(5, 60 * 1000); // 5 requests per minute

export async function POST(req: Request) {
  // Apply rate limiting
  const limitResult = await limiter(req);
  if (limitResult) {
    return limitResult;
  }

  try {
    const { email, password, username } = await req.json();
    
    // if (!isPasswordStrong(password)) {
    //   return NextResponse.json({ error: "Password does not meet strength requirements" }, { status: 400 });
    // }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username,
      }
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 });
  }
}