// Step 1: Nodemailer ko hata kar @sendgrid/mail ko add karein
const sgMail = require('@sendgrid/mail');
const { otp_data } = require('../services/otp');

// API Key ko yahan set karein (yeh aapke .env file se PASS variable utha lega)
sgMail.setApiKey(process.env.PASS);

// OTP generate function waisa hi rahega
function otpgenerate() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Controller function bhi waisa hi rahega
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

    // Naya sendotp function call hoga
    await sendotp(email, otp);

    // DB mein save karne ka logic waisa hi hai
    await otp_data({ email, otp });

    console.log("OTP sent and saved via SendGrid API");

    return res.json({
      success: true,
      message: "OTP sent successfully",
      email: email,
      otp: otp, // Ise production mein hata dein
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


// Step 2: Humne sendotp function ko poori tarah se badal diya hai
const sendotp = async (toemail, otp) => {
  try {
    const msg = {
      to: toemail,
      from: 'radheshyamdukiya002@gmail.com', // Yeh email SendGrid par VERIFIED hona zaroori hai
      subject: 'Your OTP Code',
      html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
    };

    // Email bhejne ka naya tareeka
    await sgMail.send(msg);
    console.log("✅ OTP sent successfully using SendGrid API to:", toemail);

  } catch (err) {
    console.error("❌ SendGrid API send failed:", err);
    // Isse humein asli error pata chalega
    if (err.response) {
      console.error(err.response.body);
    }
    throw err; // error ko controller tak bhejna zaroori hai
  }
};

module.exports = otp_send;
