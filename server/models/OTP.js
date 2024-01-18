const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');


const OTPSchema = new mongoose.Schema(
    {

        email:
        {
            type: String,
            required: true,
        },
        otp:
        {
            type: String,
            required: true,
        },
        createdAt:
        {
            type: Date,
            default: Date.now(),
            expires: 5 * 60,
        }
    }
);

// pre middle ware

async function sendVerificationEmail(email,otp)
{
        try {
			const mailResponse = await mailSender(
				email,
				'Verification email',
				otp
			);
            
            console.log('Email send successfully', mailResponse);
        
        } catch (error) {
            
            console.log("while Sending mail",error);
            throw error;

        }
}


// pre middle ware
 
OTPSchema.pre("save",async function()
{
    await sendVerificationEmail(this.email, this.otp);
    next();
})






module.exports = mongoose.model("OTP", OTPSchema);   