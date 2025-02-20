export const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    return {
      otp,
      expiresAt,
    };
  };