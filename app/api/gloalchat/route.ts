import prisma from "@/prisma";
import { connectToDatabase } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { address, text } = await req.json();

    // Check if the provided address exists in any of the models
    const employer = await prisma.employer.findUnique({
      where: { address },
    });

    const freelancer = await prisma.freelancer.findUnique({
      where: { address },
    });

    const reviewer = await prisma.reviewer.findUnique({
      where: { address },
    });

    if (employer) {
      // If the address belongs to an employer, send the message to the employer
      // Here you can implement the logic to send the message to the employer
      console.log(`Message for employer ${employer.name}: ${text}`);
    } else if (freelancer) {
      // If the address belongs to a freelancer, send the message to the freelancer
      // Here you can implement the logic to send the message to the freelancer
      console.log(`Message for freelancer ${freelancer.name}: ${text}`);

      // Return the freelancer details in the response
      return NextResponse.json({ success: true, freelancer }, { status: 200 });
    } else if (reviewer) {
      // If the address belongs to a reviewer, send the message to the reviewer
      // Here you can implement the logic to send the message to the reviewer
      console.log(`Message for reviewer ${reviewer.name}: ${text}`);
    } else {
      // If the address does not match any user, return an error
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
