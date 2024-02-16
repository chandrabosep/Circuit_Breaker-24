import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();
    const freelancerAddress = searchParams.get("freelancerAddress");
    const freelancer = await prisma.freelancer.findMany({
      where: { address: freelancerAddress },
    });
    return NextResponse.json({ freelancer: freelancer }, { status: 200 });
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
