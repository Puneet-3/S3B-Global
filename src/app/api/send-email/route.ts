import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, message" },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter using environment variables
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const secure = port === 465;
    const user = process.env.SMTP_USER || "";
    const pass = process.env.SMTP_PASS || "";
    const fromEmail = process.env.SMTP_FROM || user;

    // If SMTP credentials aren't configured yet, log the email and return success
    if (!user || !pass) {
      console.warn("SMTP credentials (SMTP_USER/SMTP_PASS) are not set. Logging email to console.");
      console.log(`[Send Email Proxy Log] To: ${to}, Subject: ${subject}, Message: ${message}`);
      return NextResponse.json({
        success: true,
        message: "Email logged successfully (SMTP credentials not configured)."
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"S3B Global" <${fromEmail}>`,
      to,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error in send-email API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
