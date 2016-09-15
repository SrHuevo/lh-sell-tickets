var NodeMailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var QR = require('./qr.service');

module.exports.sendMail = function(ticket){
    var mailAccountUser = process.env.MAIL_SENDER_LHT;
    var mailAccountPassword = process.env.PASS_SENDER_LHT;

    var fromEmailAddress = process.env.MAIL_SENDER_LHT;
    var toEmailAddress =  ticket.mail;

    var transport = NodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: mailAccountUser,
            pass: mailAccountPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    }));

    QR.getQR(ticket, function(data){
        var mail = {
            from: fromEmailAddress,
            to: toEmailAddress,
            subject: "hello world!",
            html: "<p>Su entradada queda adjunta</p>",
            attachments: [{filename: 'entrada.png',
                content: data,
                encoding: 'base64'
            }]
        };

        transport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            transport.close();
        });
    });
}
