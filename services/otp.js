const Otp = require('../models/otp');

module.exports.otp_data = async ({ email, otp }) => {
  try {
    const savedOtp = await Otp.create({
      email,
      otp,
    });
    console.log('OTP saved successfully');
    return savedOtp; // return karna zaroori hai
  } catch (err) {
    console.log("Data is not saved");
    console.error(err);
    throw err; // error ko controller tak bhej do
  }
};
