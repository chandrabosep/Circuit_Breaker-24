import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const { address, name, description } = body;
    const employer = await prisma.freelancer.create({
      // @ts-ignore
      data: {
        address,
        name,
        description,
      },
    });
    return NextResponse.json(employer);
  } catch (e) {
    console.log(e);
  }
}
