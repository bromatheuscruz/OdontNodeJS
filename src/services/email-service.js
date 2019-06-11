const sgMail = require("@sendgrid/mail");
const config = require("../config");

exports.sendEmail = async (newUser) => {

  const uri = `http://localhost:3000/pages/confirm_register/${newUser.generatedKey}`;

  sgMail.setApiKey(config.SG_KEY);
  const msg = {
    to: newUser.email,
    from: "noreply@odont.com.br",
    subject: "ODONT - CADASTRO",
    text: "Seja bem vindo!!!",
    html: `Confirme seu cadastro <a href="${uri}"><strong>AQUI</strong></a>`
  };
  await sgMail.send(msg);
};
