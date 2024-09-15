import 'dotenv/config' 

const config = {
    MONGODB_URL : process.env.MONGODB_URI,
    SMTP_HOST : process.env.SMTP_HOST,
    SMTP_USER_EMAIL : process.env.SMTP_USER_EMAIL,
    SMTP_HOST_PASS : process.env.SMTP_HOST_PASS,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET : process.env.RAZORPAY_SECRET
}

export default config;