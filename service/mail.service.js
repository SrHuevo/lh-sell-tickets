var NodeMailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var QR = require('./qr.service');

module.exports.sendMail = function(ticket, sellUser) {
    var mailAccountUser = process.env.USER_SENDER_LHT;
    var mailAccountPassword = process.env.PASS_SENDER_LHT;
    var mailAccountMail = process.env.MAIL_SENDER_LHT;
    var test = process.env.TEST;
    var toEmailAddress = ticket.mail;

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

    QR.getQR(ticket, function(data) {
        var mail = {
            from: mailAccountMail,
            subject: "[AZ 2016] Pase de participante",
            html: '<p>Hola ' + ticket.name + ':</p>' +
                '<p>Le enviamos su pase para poder participar en el evento.</p>' +
                '<p>El pase tiene un único uso por lo que le recomendamos que no lo duplique ni consienta que lo hagan. En caso de un pase duplicado tendrá valided únicamente el primero que haya sido usado.</p>' +
                '<p>Le recomendamos que eche un vistazo a las normas e instrucciones pinchando <a href="http://www.lahermandad.es/apocalipsiszombie">aqui</a> antes de acudir al evento.</p>' +
                '<p>Su entrada consta de un código QR adjunto en este mensaje.</p>' +
                '<p>Puede presentar su entrada en un dispositivo digital, impresa o calcada.</p>' +
                '<p>Muchas gracias.</p>' +
                '<p>Es posible que le enviemos más correos añadiendo información de última hora importante. Esté atento.</p>',
            attachments: [{
                filename: 'entrada.png',
                content: data,
                encoding: 'base64'
            }]
        };
        if (test) {
            mail.to = sellUser.mail;
            mail.html += '<p><b>Este es un mail de DEBUG</b></p>'
        } else {
            mail.to = ticket.mail;
            mail.bcc = sellUser.mail + ',' + mailAccountMail;
        }
        transport.sendMail(mail, function(error, response) {
            if (error) {
                console.log(error);
                ticket.sendState = error;
                ticket.save(function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                ticket.sendState = 'Enviado';
                ticket.save(function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            transport.close();
        });
    });
}

module.exports.sendMailFinal = function(ticket, numero) {
    if (ticket.sendState === 'Enviado' || ticket.sendState === 'Intentándolo') {
        return;
    }
    var mailAccountUser = process.env.USER_SENDER_LHT;
    var mailAccountPassword = process.env.PASS_SENDER_LHT;
    var mailAccountMail = process.env.MAIL_SENDER_LHT;
    var test = process.env.TEST;
    var toEmailAddress = ticket.mail;

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

    QR.getQR(ticket, function(data) {
        var mail = {
            from: mailAccountMail,
            subject: "[AZ 2016] Mensaje de última hora",
            html: '<p>Hola ' + ticket.name + ':</p>' +
                '<p>Hemos realizado unas modificaciones, por tanto os recomendamos leeros detenidamente todo lo relativo al Apocalipsis Zombie <a href="http://www.lahermandad.es/apocalipsiszombie">aqui</a>.</p>' +
                '<p>Además le informamos de que su número de participante es:</p>' +
                '<h1 style="text-align: center;">Nº ' + numero + '</h1>' +
                '<p>Deberá acudir al aula ' + (numero < 200 ? '105' : '106') + ' en la primera planta del aulario I, primer edificio de la izquierda según entras por la entrada de peatones, a las 17:00. En caso de llegar más tarde de las 17:30 id directamente a la zona de infección que se encuentra en la cafetería.</p>' +
                '<p>Le volvemos a enviar su código de participante por si acaso lo has perdido/borrado/no llegó... Recuerde que el pase tiene un único uso, por lo que le recomendamos que no lo duplique ni consienta que lo hagan. En caso de un pase duplicado tendrá valided únicamente el primero que haya sido usado.</p>' +
                '<p>Puede presentar su entrada en un dispositivo digital, impresa o calcada.</p>' +
                '<p>Muchas gracias.</p>' +
                '<p>PD: Disculpad si este mail os llegó duplicado, en ese caso éste es el válido.</p>',
            attachments: [{
                filename: 'entrada.png',
                content: data,
                encoding: 'base64'
            }]
        };
        if (test) {
            mail.to = sellUser.mail;
            mail.html += '<p><b>Este es un mail de DEBUG</b></p>'
        } else {
            mail.to = ticket.mail;
            mail.bcc = mailAccountMail;
        }
        transport.sendMail(mail, function(error, response) {
            if (error) {
                console.log(error);
                ticket.sendState = error;
                ticket.save(function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                ticket.sendState = 'Enviado';
                ticket.save(function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            transport.close();
        });
    });
}