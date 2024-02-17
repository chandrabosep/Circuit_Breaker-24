import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();
    const reviewerAddress = searchParams.get("reviewerAddress");

    // Fetch details of the reviewer based on their address
    const reviewer = await prisma.reviewer.findUnique({
      where: { address: reviewerAddress },
    });

    // Return the details of the reviewer
    return NextResponse.json({ reviewer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviewer details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
