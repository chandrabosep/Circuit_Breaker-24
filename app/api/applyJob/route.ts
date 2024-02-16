import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const { jobId, applicantId } = body; 
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (!existingJob.peopleApplied.includes(applicantId)) {
      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: { peopleApplied: { push: applicantId } },
      });
      return NextResponse.json(updatedJob);
    } else {
      return NextResponse.json({
        error: "You have already applied for this job",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
