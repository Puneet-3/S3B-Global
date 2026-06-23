const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
 
const app = express();
app.use(cors()); // Allow cross-origin requests from Next.js frontend
app.use(express.json());
 
// Gmail transporter (REAL EMAIL SENDING)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mundruudaysai12@gmail.com",
    pass: "poesiudvunnkdbco"
  }
});
 
// Verify connection (optional but useful)
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("Gmail is ready to send emails");
  }
});
 
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;
 
  try {
    await transporter.sendMail({
      from: "s3bglobal.dev@gmail.com",
      to,
      subject,
      text: message
    });
 
    res.json({
      success: true,
      message: "Email sent successfully"
    });
 
  } catch (error) {
    console.error("Email sending failed:", error);
 
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
 
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
