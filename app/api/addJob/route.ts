import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const {
      title,
      description,
      category,
      tasks,
      delivery,
      reviewDate,
      budget,
      address,
    } = body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        tasks,
        delivery,
        reviewDate,
        budget,
        address: address,
      },
    });
    return NextResponse.json(job);
  } catch (e) {
    console.log(e);
  }
}
