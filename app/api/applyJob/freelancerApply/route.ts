import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const { jobId, freelancerAddress } = body;
    
    const existingFreelancer = await prisma.freelancer.findUnique({
      where: { address: freelancerAddress },
    });

    if (!existingFreelancer) {
      return NextResponse.json({ error: "Freelancer not found" }, { status: 404 });
    }

    // Update the freelancer to add the job ID
    const updatedFreelancer = await prisma.freelancer.update({
      where: { address: freelancerAddress },
      data: { jobs: { push: jobId } },
    });

    return NextResponse.json(updatedFreelancer);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
