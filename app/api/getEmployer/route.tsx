import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams }: any = new URL(req.url);
  try {
    await connectToDatabase();
    const employers = await prisma.employer.findUnique({
      where: { address: searchParams.get("address") },
    });
    return NextResponse.json({ employers }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
