const nodemailer = require('nodemailer');

function enviarEmail(){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "leans.flavio@gmail.com",
            pass: "fl4v10ls10"
        },
        tls: { rejectUnauthorized: false }
      });
    
      const mailOptions = {
        from: 'leans.flavio@gmail.com',
        to: 'leans.flavio@gmail.com',
        subject: 'E-mail enviado usando Node!',
        html:({path: './index.html'})
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      })   
   }
modulo.exports = enviarEmail();