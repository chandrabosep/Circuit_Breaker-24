import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const { jobId, applicantId } = body;
    await prisma.job.findUnique({
      where: { id: jobId },
    });
    console.log(applicantId);
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: { assigned: applicantId },
    });
    return NextResponse.json(updatedJob);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
