const sgMail = require("@sendgrid/mail");

exports.sendEmail = newUser => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: newUser.email,
    from: "test@example.com",
    subject: "#VEEEEEEEEEEEEEEEEEEM PRO FUT",
    text: "#vemprofut",
    html: `<strong>Bem vindo ${newUser.name}</strong>`
  };
  sgMail.send(msg);
};
