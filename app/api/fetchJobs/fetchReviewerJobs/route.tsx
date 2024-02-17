import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();

    const jobId = searchParams.get("jobId");

    const employer = await prisma.job.findUnique({
      where: {
        id: jobId, // Assuming jobId is the ID of the job
      },
      include: {
        employer: {
          include: {
            jobs: true,
          },
        },
      },
    });

    return NextResponse.json({ employer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
