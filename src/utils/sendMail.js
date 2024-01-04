const nodemailer = require("nodemailer");
const { EMAIL, PASS, TO } = process.env;
const sendMail = async (body, file) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: PASS,
    },
  });

  const mailOptions = {
    from: `<${EMAIL}>`,
    to: TO,
    // subject: "Polygon Design Studio - Contact",
    html: body,
  };
  if (file)
    mailOptions.attachments = [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ];
  try {
    const info = await transporter.sendMail(
      file ? { ...mailOptions, subject: 'Polygon Design Studio - Careers' } 
      : { ...mailOptions, subject: 'Polygon Design Studio - Contact' });
    console.log("Message sent: " + info.response);
    return "Message sent";
  } catch (error) {
    console.error("Mail error:", error?.message ?? "some thing went wrong");
    return error?.message ?? "some thing went wrong";
  }
};

module.exports = {
  sendMail,
};