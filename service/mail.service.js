var NodeMailer = require('nodemailer');

module.exports.sendMail = function(ticket){
    nodemailer.createTransport('smtps://'+process.env.MAIL_SENDER_LHST+'%40gmail.com:'+process.env.PASS_SENDER_LHST+'@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"'+process.env.NAME_SENDER_LHST+'" <'+process.env.MAIL_SENDER_LHST+'@gmail.com>', // sender address
        to: ticket.mail, // list of receivers
        subject: '[La Hermandad] Entrada AZ', // Subject line
        text: 'Aquí tiene su entrada' // plaintext body
        // ,attachments: [{filename:'',
        //     MailPenes: https://nodemailer.com/using-attachments/
        //     Para los qr: https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=}]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
