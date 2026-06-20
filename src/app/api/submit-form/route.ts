import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let formType = "";
    let data: any = {};
    let attachments: any[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      formType = formData.get("formType") as string;
      
      // Parse the key-value pairs
      formData.forEach((value, key) => {
        if (key === "formType" || key === "resumeFile") return;
        data[key] = value;
      });

      // Handle file attachments
      const resumeFile = formData.get("resumeFile");
      if (resumeFile && resumeFile instanceof File) {
        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: resumeFile.name,
          content: buffer,
        });
        data["resumeFileName"] = resumeFile.name;
      }
    } else {
      const json = await request.json();
      formType = json.formType;
      data = json.data;
    }

    // Configure Nodemailer transporter using environment variables with hardcoded production fallbacks
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465");
    const secure = port === 465;
    const user = process.env.SMTP_USER || "s3bglobal.dev@gmail.com";
    const pass = process.env.SMTP_PASS || "ywtgagtgzynhlvrc";
    const contactEmail = process.env.CONTACT_EMAIL || "leadenquiry@s3bglobal.com";
    const fromEmail = process.env.SMTP_FROM || user;

    // If SMTP credentials aren't configured yet, log the submission and return success (so form works in sandbox/dev)
    if (!user || !pass) {
      console.warn("SMTP credentials (SMTP_USER/SMTP_PASS) are not set in environment variables. Logging submission to console.");
      console.log(`[Form Submitted] Type: ${formType}, Data:`, data);
      return NextResponse.json({ 
        success: true, 
        message: "Submission received successfully (SMTP credentials not configured)." 
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

    // Create a user-friendly HTML email template based on the form type
    const subject = `[New Submission] S3B Global Website - ${formType.toUpperCase()}`;
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #1d70b8; border-bottom: 2px solid #1d70b8; padding-bottom: 10px; margin-top: 0;">S3B Global Website Submission</h2>
        <p style="margin: 5px 0;"><strong>Form Type:</strong> <span style="background-color: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${formType.toUpperCase()}</span></p>
        <p style="margin: 5px 0;"><strong>Submission Date:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST</p>
        <hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
    `;

    for (const [key, value] of Object.entries(data)) {
      if (!value) continue;
      // Beautify key names
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      htmlContent += `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 10px; font-weight: bold; width: 35%; color: #475569; vertical-align: top;">${label}</td>
          <td style="padding: 12px 10px; color: #0f172a; vertical-align: top; white-space: pre-wrap;">${value}</td>
        </tr>
      `;
    }

    htmlContent += `
        </table>
        <hr style="border: 0; border-top: 1px solid #1d70b8; margin: 25px 0 15px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center; margin: 0;">This email was sent automatically from the S3B Global Website backend.</p>
      </div>
    `;

    // Send the email to the admin/inbox
    console.log("SMTP Debug - Attempting to send email:", {
      from: fromEmail,
      to: contactEmail,
      smtpHost: host,
      smtpPort: port,
    });

    await transporter.sendMail({
      from: `"Enquiry - S3B Global" <${fromEmail}>`,
      to: contactEmail,
      subject,
      html: htmlContent,
      attachments,
    });

    // Send a confirmation email to the submitting user
    const userEmail = data.email || data.Email;
    if (userEmail) {
      let userSubject = "";
      let userHtml = "";

      if (formType === "newsletter") {
        userSubject = "Welcome to the S3B Global Newsletter!";
        userHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #1d70b8; margin-top: 0; font-size: 22px;">Thanks for Subscribing!</h2>
            <p>Hi,</p>
            <p>Thank you for subscribing to the S3B Global newsletter. We're excited to share our latest insights on AI, cloud transformation, enterprise software engineering, and digital marketing with you.</p>
            <p>If you have any questions or want to discuss a project, feel free to reply directly to this email or visit our <a href="https://s3bglobal.com/contact/" style="color: #1d70b8; text-decoration: none; font-weight: bold;">Contact Page</a>.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
            <p style="font-size: 13px; color: #475569; font-weight: bold; margin: 0;">S3B Global Team</p>
          </div>
        `;
      } else if (formType === "careers") {
        const applicantName = data.fullName || "Applicant";
        userSubject = `Application Received: ${data.jobTitle || "Job Role"} - S3B Global`;
        userHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #1d70b8; margin-top: 0; font-size: 22px;">Application Received</h2>
            <p>Dear ${applicantName},</p>
            <p>Thank you for your interest in joining S3B Global! We have successfully received your application for the position of <strong>${data.jobTitle || "Open Role"}</strong>.</p>
            <p>Our Human Resources team will review your application and resume against the requirements for this role. If your skills and experience match our needs, we will reach out to schedule an initial interview.</p>
            <p>Thank you again for your time and interest in S3B Global.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
            <p style="font-size: 13px; color: #475569; font-weight: bold; margin: 0;">S3B Global HR Team</p>
          </div>
        `;
      } else {
        // Contact Form / Service Inquiry
        const userName = data.firstName ? `${data.firstName} ${data.lastName || ""}`.trim() : "there";
        userSubject = "Thank you for contacting S3B Global";
        userHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #1d70b8; margin-top: 0; font-size: 22px;">Thank You for Reaching Out!</h2>
            <p>Hi ${userName},</p>
            <p>We have received your message and our team is already reviewing it. One of our technology consultants or account representatives will contact you within the next 12 business hours.</p>
            <p>For your records, here is a summary of the details you submitted:</p>
            <blockquote style="background-color: #f8fafc; border-left: 4px solid #1d70b8; padding: 15px; margin: 20px 0; color: #334155; font-style: italic; border-radius: 4px; font-size: 14px; line-height: 1.5;">
              ${data.comments || "Service inquiry request."}
            </blockquote>
            <p>If you have any urgent questions, please feel free to reply to this email directly.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
            <p style="font-size: 13px; color: #475569; font-weight: bold; margin: 0;">S3B Global Team</p>
          </div>
        `;
      }

      // Send the confirmation email to the user
      await transporter.sendMail({
        from: `"S3B Global" <${fromEmail}>`,
        to: userEmail,
        subject: userSubject,
        html: userHtml,
      });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully." });
  } catch (error: any) {
    console.error("Error in submit-form API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process form submission." },
      { status: 500 }
    );
  }
}
