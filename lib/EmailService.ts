import nodemailer from "nodemailer";

export default async function EmailService(userData: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kateshivansh2303@gmail.com",
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Swim For India Academy" <kateshivansh2303@gmail.com>`,
      to: userData.email,
      subject: "Swimming Competition Registration",
      replyTo: "info@swimforindiaacademy.com",
      html: `
         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Dear Swimmer,</p>
      <p>Thank you for registering in the Delhi Open Talent Search Swimming Competition 2025.</p>
      <p><strong>Event Date: 3rd August 2025, Sunday</strong></p>
      <p>Our Contact details are:</p>
      <p>Questions? Call/WhatsApp <strong>7065195811, 9310523009</strong></p>
      <p>Email: <a href="mailto:info@swimforindiaacademy.com" style="color: #1a73e8;">info@swimforindiaacademy.com</a></p>
      <p>Please keep checking your email as all communication is sent on email. We will send you meet program by Thursday, 22nd August.</p>
      <p>Wishing you all the best.</p>
      <p><strong>Keep Swimming, Keep Swimming!</strong></p>
      <p>With best wishes from Swim For India Academy,</p>
      <p>Respectfully Yours,</p>
      <p>Dr. Jitender Tokas<br>Organizing Secretary</p>
    </div>
        `,
    };
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}
