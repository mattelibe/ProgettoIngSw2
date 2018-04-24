var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var app = express();
//Gestione dati statici (immagini, css)
app.use(express.static('public'));
//Gestione pagine da visualizzare e strumento di render
app.set('views', __dirname + '/FrontEnd');
app.engine('html', require('ejs').renderFile);
//Gestione informazioni url( login, ricerca)
app.use(bodyParser.urlencoded({ extended: false }));

// Carico pagina principale
app.get('/', function( req, res)
{
    console.log("GET LOGIN");
    res.render("login.html");
});

//Accesso home mediante POST
app.post('/home', function(req, res)
{
    var data = req.body.username + " " + req.body.password;
    console.log(data + ' Submitted Successfully!');
    console.log("POST HOME");
    res.render('home.html');
});

//Accesso home mediante GET
app.get('/home', function(req, res)
{
    console.log("GET HOME");
    res.render('home.html');
});

//Accesso alla zona segreteria
app.get('/segreteria', function(req,res)
{
    console.log("GET SEGRETERIA");
    res.render("segreteria.html");
});

//Invio mail per la segreteria
app.post('/send', function(req, res)
{
    //console.log(req.body.mesg);
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "se2testingprj1@gmail.com",// generated ethereal user
            pass: "w6tc+5C]" // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Test" <se2testingprj@gmail.com>', // sender address
        to: 'bendadavide@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: req.body.mesg // plain text body
        //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info)
    {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    res.redirect("/home");
});

//Gestione ricerca
app.get('/topic/:questionValue', function(req, res)
{

        //console.log("GET " + req.params.questionValue);

        //Pagina html da ricercare in base al valore inserito
        var topic = req.params.questionValue+".html";
        //Render pagina
        res.render(("topic/"+ topic),function (err, html)
            {
                //Se non esiste restituisce una pagina di errore
                if(err)
                {
                    res.render("segreteria.html");
                }
                //Se esiste viene visualizzata
                res.render(html);
            }
        );
});

//Funzione di ascolto
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
