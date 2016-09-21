var NodeMailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var QR = require('./qr.service');

module.exports.sendMail = function(ticket, sellUser){
    var mailAccountUser = process.env.USER_SENDER_LHT;
    var mailAccountPassword = process.env.PASS_SENDER_LHT;
    var mailAccountMail = process.env.MAIL_SENDER_LHT;
    var toEmailAddress =  ticket.mail;

    var transport = NodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: mailAccountMail,
            pass: mailAccountPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    }));

    QR.getQR(ticket, function(data){
        var mail = {
            from: mailAccountMail,
            to: ticket.mail,
            bcc: sellUser.mail + ',' + mailAccountMail,
            subject: "[AZ 2016] Pase de participante",
            html:
                    '<p>Hola ' +ticket.name+':</p>'+
                    '<p>Le enviamos su pase para poder participar en el evento.</p>'+
                    '<p>El pase tiene un único uso por lo que le recomendamos que no lo duplique ni consienta que lo hagan. En caso de un pase duplicado tendrá valided únicamente el primero que haya sido usado.</p>'+
                    '<p>Le recomendamos que eche un vistazo a las normas e instrucciones pinchando <a href="http://www.lahermandad.es/apocalipsiszombie">aqui</a> antes de acudir al evento.</p>'+
                    '<p>Su entrada consta de un código QR adjunto en este mensaje.</p>'+
                    '<p>Puede presentar su entrada en un dispositivo digital, impresa o calcada.</p>'+
                    '<p>Muchas gracias.</p>'+
                    '<p>Es posible que le enviemos más correos añadiendo información de última hora importante. Esté atento.</p>',
            attachments: [{filename: 'entrada.png',
                content: data,
                encoding: 'base64'
            }]
        };
        transport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
                ticket.sendState = error;
                ticket.save(function(err){
    				if(err){
    					console.error(err);
    				}
                });
            }else{
                ticket.sendState = 'Enviado';
                ticket.save(function(err){
                    if(err){
                        console.error(err);
    				}
                });
            }

            transport.close();
        });
    });
}
