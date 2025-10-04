const User = require('../models/user');
const userser = require("../services/regdata");


module.exports.reg = async (req, res) => {
    try {
        const { email, password, username, mobilenum } = req.body;

        if (!email || !password || !username || !mobilenum) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const prev_user = await User.findOne({ email });
        if (prev_user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        await userser.reguser({ email, password, username, mobilenum });

        return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send("Email and password are required");
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.send("User not found");
        }

        if (existingUser.password == password) {
            return res.render("homeee",{user:existingUser})
        } else {
            return res.send("Wrong password");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}
