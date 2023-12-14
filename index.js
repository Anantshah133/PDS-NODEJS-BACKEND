const nodemailer = require('nodemailer');

const smtpmailer = async (to, from, subject, body, isGmail = true) => {
  const transporter = nodemailer.createTransport({
    service: isGmail ? 'Gmail' : 'smtpout.secureserver.net',
    auth: {
      user: 'pragmatestmail@gmail.com', // Your email address
      pass: 'nugw bupd idjy ubrb', // Your email password
    },
  });

  const mailOptions = {
    from: `<${from}>`,
    to,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: ' + info.response);
    return 'Message sent';
  } catch (error) {
    console.error('Mail error:', error.message);
    return error.message;
  }
};

const msg = "message";
const subject = "test message";
const to = "fenil.fameux@gmail.com";
const name = "fenil";
const from = "pragmatestmail@gmail.com";

smtpmailer(to, from, subject, msg)
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
