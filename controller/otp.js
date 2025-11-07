// Filename: otp_controller.js

const nodemailer = require('nodemailer'); 
const { otp_data } = require('../services/otp'); 

const BREVO_CONFIG = {
    host: 'smtp-relay.brevo.com',
    port: 2525, 
    secure: false,
    auth: {
        user: '9b0fc6001@smtp-brevo.com',
        pass: '3PS87MRWDetdc1LI'
    }
};

const transporter = nodemailer.createTransport(BREVO_CONFIG);

function otpgenerate() {
    return Math.floor(100000 + Math.random() * 900000);
}

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

        await sendotp(email, otp);
        await otp_data({ email, otp });

        console.log("OTP sent and saved via Brevo SMTP (Port 2525)");

        return res.json({
            success: true,
            message: "OTP sent successfully",
            email: email,
        });

    } catch (err) {
        console.error("❌ Failed to send OTP in controller:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: err.message,
        });
    }
};


const sendotp = async (toemail, otp) => {
    const SENDER_EMAIL = 'radheshyamdukiya002@gmail.com'; 

    const mailOptions = {
        to: toemail,
        from: SENDER_EMAIL, 
        subject: 'Your OTP Code',
        html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ OTP sent successfully using Brevo SMTP (Port 2525) to:", toemail);
        console.log("Message ID:", info.messageId);
        
    } catch (err) {
        console.error(`❌ SMTP Connection Failed or Timed Out. Check firewall/port:`, err.message);
        throw new Error("SMTP connection failed. Please check your Brevo SMTP Key."); 
    }
};

module.exports = otp_send;
