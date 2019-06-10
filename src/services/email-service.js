const sgMail = require("@sendgrid/mail");

exports.sendEmail = newUser => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: newUser.email,
    from: "noreply@odont.com.br",
    subject: "ODONT - CADASTRO",
    text: "Seja bem vindo!!!",
    html: `<strong>Bem vindo ${newUser.name}</strong>`
  };
  sgMail.send(msg);
};
