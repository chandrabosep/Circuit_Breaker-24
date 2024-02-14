import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const { address, name, companyName, description } = body;
    const employer = await prisma.employer.create({
      // @ts-ignore
      data: {
        address,
        name,
        companyName,
        description,
      },
    });
    return NextResponse.json(employer);
  } catch (e) {
    console.log(e);
  }
}
