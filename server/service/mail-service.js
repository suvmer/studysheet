const nodemailer = require('nodemailer')
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationMail(to, link, text = "") {
    console.log(`Sending mail... to: ${to} link: ${link} host: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} user: ${process.env.SMTP_USER} apiurl: ${process.env.API_URL}`);
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на '+ process.env.API_URL,
      text: "",
      html: `
      <div>
        <h2>${text}</h2>
        <br/>
        <h1>Для активации аккаунта перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
      </div>
      `
    })
  }
}

module.exports = new MailService;

