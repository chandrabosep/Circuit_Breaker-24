import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();

    const address = searchParams.get("address");

    const employer = await prisma.job.findMany({
      where: {
        assigned: address,
      },
      include: {
        employer: true,
      },
    });

    return NextResponse.json({ employer }, { status: 200 });
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
