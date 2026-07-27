import nodemailer from "nodemailer";


const emailConfig = {
  user: "vishmi@fedolab.com", // e.g., 'support@yourdomain.com'
  pass: "Vishmi!@#", // app-specific password
};

export class EmailService {
  static async sendVerificationEmail(email: string, verificationCode: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465, // or use 587 for TLS
        secure: true, // true for 465 (SSL), false for 587 (TLS)
        auth: {
          user: emailConfig.user,
          pass: emailConfig.pass,
        },
      });

      const mailOptions = {
        from: `"Aura PRP Clinic" <${emailConfig.user}>`,
        to: email,
        subject: "Verify Your Email Address",
        text: `Please use the following verification code to verify your account: ${verificationCode}`,
        html: `<p>Please use the following verification code to verify your account:</p><h2>${verificationCode}</h2>`,
      };

      const response = await transporter.sendMail(mailOptions);

      return response?.accepted?.length > 0;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}
