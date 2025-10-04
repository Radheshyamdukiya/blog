const express = require("express");
const otp_db = require('../models/otp');
const emailController = require('../controller/otp'); 
const User = require("../models/user");

const route = express.Router();

// ------------------ CHECK USER & PASSWORD ------------------
route.post("/check-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register."
            });
        }

        // Password check
        if (user.password != password) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            });
        }

        return res.json({
            success: true,
            message: "User verified",
            user: user
        });

    } catch (err) {
        console.error("Full Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
});

// ------------------ SEND OTP ------------------
route.get('/verify', emailController); // send OTP email

// ------------------ VERIFY OTP ------------------
route.post("/verify", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecords = await otp_db.find({ email });
        const user = await User.findOne({ email });

        if (!otpRecords || otpRecords.length === 0)
            return res.status(404).json({ success: false, message: "Email not found or OTP not sent" });

        const latestOtp = otpRecords[otpRecords.length - 1].otp;

        if (latestOtp.toString() !== otp.toString())
            return res.status(400).json({ success: false, message: "Invalid OTP" });

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });
        return res.json({ success: true, redirectUrl: "/home?email=" + encodeURIComponent(email) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
route.get("/home", async (req, res) => {
    const email = req.query.email;  // ya req.body.email, jo bhi fetch ke through bhej rahe ho
    const user = await User.findOne({ email });
console.log(user);
    if (!user) return res.send("User not found");

    res.render("home", {
        user: user.toObject()  // ✅ user object pass karna mandatory hai
    });
});
module.exports = route;
