import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();
    const jobs = await prisma.job.findUnique({
      where: { id: searchParams.get("id") },
    });
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
