const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false,
  auth: {
    user: "MS_R1YBRb@test-yxj6ij91yo14do2r.mailersend.net",
    pass: "mssp.12H91c8.neqvygmy5n5g0p7w.PuqJ1u8"
  }
});

async function sendResetMail(to, resetLink) {
  const mailOptions = {
    from: '"GrowEmpire" <no-reply@growempire.ch>',
    to: to,
    subject: "🔐 Passwort zurücksetzen",
    html: `<p>Klicke auf den folgenden Link, um dein Passwort zurückzusetzen:</p><p><a href="${resetLink}">${resetLink}</a></p>`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendResetMail;
