import { parse } from "csv-parse/sync";
import connect from "@/app/db/connect";
import leadModel from "@/app/db/models/leadModel";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  await connect();
  const body = await req.json();
  const { emailLeads } = body;

  // Validate the email leads input
  if (!emailLeads) {
    return NextResponse.json(
      { message: "Email leads are required" },
      { status: 400 }
    );
  }

  try {
    // Parse email leads
    const records = parse(emailLeads, {
      columns: true,
      skip_empty_lines: true,
    });

    for (const record of records) {
      const { email } = record;

      if (!email) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
    }

   
    });

    await Promise.all(leadPromises); // Await all saves

    return NextResponse.json(
      { message: "Email leads saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error processing email leads",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
