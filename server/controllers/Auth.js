const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');

// send OTP

exports.sendOTP = async (req, res) => {
	try {
		// fetch email from request ki body
		const { email } = req.body;

		// check if user already exist

		const checkUserPresent = await User.findOne({ email });

		// if user alredy exists then return a response
		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: 'login karle pehlse se hi hain',
			});
		}

		// generate otp
		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlhabets: false,
			specialChars: false,
		});
		console.log('otp generated ', otp);

		const result = await OTP.findOne({ otp: otp });

		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
				lowerCaseAlhabets: false,
				specialChars: false,
			});
			result = await OTP.findOne({ otp: otp });
		}

        // db mein save karlo isko
	} catch (error) {}
};
