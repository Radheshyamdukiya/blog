const nodemailer = require("nodemailer");
const { otp_data } = require('../services/otp'); // ✅ destructure sahi se import karo

// ✅ 1. OTP generate function
function otpgenerate() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP (zyada secure)
}

// ✅ 2. Controller function
const otp_send = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otp = otpgenerate();

    // ✅ send OTP via email
    await sendotp(email, otp);

    // ✅ save OTP to DB via service
    await otp_data({ email, otp });

    console.log("OTP sent and saved");

    // ✅ proper response
    return res.json({
      success: true,
      message: "OTP sent successfully",
      email: email,
      otp: otp, // remove this in production for security
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: err.message,
    });
  }
};


const sendotp = async (toemail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "radheshyamdukiya002@gmail.com",
        pass: "bkkc tpje xrvu wsvf", // ✅ keep this in .env file for security
      },
    });

    const mailOptions = {
      from: '"OTP Service" <radheshyamdukiya002@gmail.com>',
      to: toemail,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent successfully to:", toemail);
    return info;

  } catch (err) {
    console.error("❌ Email send failed:", err);
    throw err; // error controller tak bhejna zaroori hai
  }
};

module.exports =  otp_send ;
