var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var expressSes = require('express-session');
var vectorUsr = ['se2testingprj1@gmail.com','aaa'], vectorPswrd = ['w6tc+5C','aaa'];
var app = express();

//Gestione dati statici (immagini, css)
app.use(express.static('public'));
//Gestione pagine da visualizzare e strumento di render
app.set('views', __dirname + '/FrontEnd');

app.set('view engine', 'ejs');

//Gestione informazioni url( login, ricerca)
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSes({secret: 'gS3NyHfq70', saveUninitialized: false, resave: false}));

//Settaggio porta per gestione sia locale che su heroku
app.set('port', process.env.PORT || 3000);
// Carico pagina principale
app.get('/', function( req, res)
{
  req.session.success = false;
    console.log("GET LOGIN");
    res.render('login', {success: req.session.success});
});

//Accesso home mediante POST
app.post('/home', function(req, res)
{
    if( (vectorUsr.indexOf(req.body.username)!= -1) && (vectorPswrd.indexOf(req.body.password) != -1))
    {
        req.session.success=true;
        console.log(req.body.username + ' submitted Successfully!');
        console.log("POST HOME");
        res.status(200).render('home',{success: req.session.success});

    }
    else
    {
        req.session.success = false;
        res.status(403).redirect('/');
    }
});

//Accesso home mediante GET
app.get('/home', function(req, res)
{
    if(req.session.success)
    {
        console.log("GET HOME");
        res.status(200).render('home',{success: req.session.success});
    }
    else
    {
        console.log("GET LOGIN");
        res.status(403).redirect('/');
    }
});

//Accesso alla zona segreteria
app.get('/segreteria', function(req,res)
{
    if(req.session.success)
    {
        console.log("GET SEGRETERIA");
        res.status(200).render("segreteria",{success: req.session.success});
    }
    else
    {
        console.log("GET LOGIN");
        res.status(403).redirect('/');
    }

});

//Invio mail per la segreteria
app.post('/send', function(req, res)
{
    //Creazione gestore mail
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', //server che utilizza per l'invio
        port: 587,
        secure: false, // per la demo il fattore di sicurezza verrà omesso
        auth: {
            user: "se2testingprj1@gmail.com",// utente che invia la mail
            pass: "w6tc+5C]" // password dell'utente
        },
        tls:{
            rejectUnauthorized:false    //per il testing in localhost evita che la richiesta venga rifiutata
        }
    });
    // Creazione mail
    var mailOptions = {
        from: '"Domanda segreteria" <se2testingprj@gmail.com>', // mittente
        to: 'bendadavide@gmail.com', // destinatario
        subject: 'Domanda segreteria', // Oggetto della mail
        text: req.body.mesg // Messaggio presente nel form della pagina della segreteria
    };

    // Invio mail
    transporter.sendMail(mailOptions, function (error, info)
    {
        //In caso di fallimento viene stampato un messaggio di errore
        if (error) {
            return console.log(error);
        }
    });
    res.redirect("home");  //Ritorno alla home dopo l'invio del messaggio
});

//Gestione ricerca
app.get('/topic/:questionValue', function(req, res)
    {
        var error =false;
        if(req.session.success)
        {
            //Pagina html da ricercare in base al valore inserito
            var topic = req.params.questionValue.toLowerCase();
            //Render pagina
            res.render(('topic/'+ topic),function (err)
            {
                //Se non esiste restituisce una pagina di errore
                if(err)
                {
                    error= true;
                    console.log("GET PAGINA NON TROVATA");
                    res.status(404).render('pag_non_trovata',{success: req.session.success});
                }
            });
            if(!error)
            {
              console.log("GET " + req.params.questionValue.toUpperCase());
              res.status(200).render('topic/'+ topic,{success: req.session.success});
            }
        }
        else
        {
            console.log("GET LOGIN");
            res.status(403).redirect('/');
        }
        /*
        if(!loggedIn)
        {
            res.status(403).send("<h1> Area non autorizzata!</h1>");
        }
        else
        {
            //Pagina html da ricercare in base al valore inserito
            var topic = req.params.questionValue+".html";
            //Render pagina
            res.render(("topic/"+ topic),function (err, html)
                {
                    //Se non esiste restituisce una pagina di errore
                    if(err)
                    {
                        console.log("GET PAGINA NON TROVATA");
                        res.status(404).render("pag_non_trovata.html");
                    }
                    //Se esiste viene visualizzata
                    else
                    {
                        console.log("GET " + req.params.questionValue.toUpperCase());
                        res.status(200).send(html);
                    }
                }
            );
        }*/

});
//Funzione di ascolto
app.listen(app.get('port'),function()
{
    console.log('Listening on port '+ app.get('port'));
});
