const router = require('express').Router();
const nodemailer = require('nodemailer');



router.post('/mail', async (req, res) => {


    let jConfig = {
        host: "smtp.gmail.com",
        port: "465",
        secure: true,
        auth: {
            type: "Gmail",
            user: 'jorgepefer.90@gmail.com',
            pass: 'estoycansado1990'
        }
    };

    let email = {
        from: "jorgepefer.90@gmail.com",  //remitente
        to: "annmaryledesmaarias@gmail.com",  //destinatario
        subject: "Nuevo mensaje de usuario",  //asunto del correo
        attachments: [
            {
                filename: 'upper.png',
                path: __dirname + '/../../models/images/upper.png',
                cid: 'up'
            },
            {
                filename: 'mainImage.png',
                path: __dirname + '/../../models/images/mainImage.png',
                cid: 'top'
            }
        ],

        html: `
           <img src="cid:up"> 
           <hr>
           <div>
           <p style="color:#0e6ebe"><b>From</b>: ${req.body.email}</p> 
           <p style="color:black"><b>User</b>: ${req.body.name}</p>
           <hr>
           <p style="color:black">     Hello, GWLVOICES </p>
           <div><p>        ${req.body.message}</p></div>
           </div>
           <img src="cid:top"> 
        `
    };

    let createTransport = nodemailer.createTransport(jConfig);


    await createTransport.sendMail(email, function (error, info) {
        if (error) {
<<<<<<< HEAD
            res.send({msg: "Error sending email!"});;
        } else {
            res.send({msg: "Ok, email was send!"});
=======
            res.send({ msg: "Error sending email!" });;
        } else {
            res.send({ msg: "Ok, email was send!" });
>>>>>>> origin/JorgeDev
        }
        createTransport.close();
    });

});


module.exports = router;