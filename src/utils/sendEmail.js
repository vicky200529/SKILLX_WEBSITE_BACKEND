const nodemailer = require("nodemailer");
const config = require("../config");

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: `"SKILLX" <${config.smtp.from}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
