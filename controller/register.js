const User = require('../models/user');
const userser = require("../services/regdata");


module.exports.reg = async (req, res) => {
    const { email, password, username, mobilenum } = req.body;

    if (!email || !password || !username || !mobilenum) {
        return res.send("All fields are required");
    }

    const prev_user = await User.findOne({ email });
    if (prev_user) {
        return res.send("User already exists");
    }

    await userser.reguser({ email, password, username, mobilenum });
    res.send("User registered successfully");
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
            return res.render("home",{user:existingUser})
        } else {
            return res.send("Wrong password");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}
