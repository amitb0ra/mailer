import nodemailer from "nodemailer";
import { parse } from "csv-parse/sync";
import connect from "@/app/db/connect";
import smtpModel from "@/app/db/models/smtpModel";
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
  const { csvData } = await req.json();

  // Validate CSV data input
  if (!csvData) {
    return NextResponse.json(
      { message: "CSV data is required" },
      { status: 400 }
    );
  }

  try {
    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log(records);

    for (const record of records) {
      console.log(record);
      const { host, port, secure, user, pass } = record;

      if (!host || !port || secure === undefined) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      try {
        // Create transporter and verify SMTP configuration
        const transporter = nodemailer.createTransport({
          host,
          port: Number(port),
          secure,
          auth: user && pass ? { user, pass } : undefined,
        });

        await transporter.verify();

        // Save the SMTP configurations to the database
        const smtp = new smtpModel({
          host,
          port: Number(port),
          secure,
          auth: user && pass ? { user, pass } : undefined,
        });

        await smtp.save();
      } catch (error) {
        return NextResponse.json({
          message: "SMTP credentials are invalid",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      message: "Invalid CSV data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
