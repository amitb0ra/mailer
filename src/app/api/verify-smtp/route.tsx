import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

interface EmailRequestBody {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
}

export const POST = async (req: NextRequest) => {
    const { host, port, secure, user, pass, to, subject, text } =
      (await req.json()) as EmailRequestBody;
  
    if (!host || !port || secure === undefined || !to || !subject || !text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      });

      try {
        await transporter.verify();
        return NextResponse.json(
          { message: "Email sent successfully" },
          { status: 200 }
        );
      }

  } catch (error) {
    res.status(500).json({
      message: "SMTP credentials are invalid",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Example JSON to pass to this API
// {
//     "host": "smtp.example.com",
//     "port": 587,
//     "secure": false,
//     "user": "your-email@example.com",
//     "pass": "your-email-password",
// }
