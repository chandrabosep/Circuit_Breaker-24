import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();
    const employerAddress = searchParams.get("employerAddress");
    const employer = await prisma.employer.findMany({
      where: { address: employerAddress },
      include: {
        jobs: true,
      },
    });
    return NextResponse.json({ employer: employer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
