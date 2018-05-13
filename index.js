var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var expressSes = require('express-session');
var vectorUsr = ['se2testingprj1@gmail.com'], vectorPswrd = ['w6tc+5C'];
var app = express();
//Gestione dati statici (immagini, css)
app.use(express.static('public'));
//Gestione pagine da visualizzare e strumento di render
app.set('views', __dirname + '/FrontEnd');
//Gestore pagine html
app.set('view engine', 'ejs');
//Gestione informazioni url( login, ricerca)
app.use(bodyParser.urlencoded({ extended: false }));
//Gestore sessione
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

app.get('/login', function (req, res)
{
   req.session.success = false;
   console.log("LOG OUT");
   res.render('login',{success: req.session.success});
});

//Accesso home mediante POST
app.post('/home', function(req, res)
{
    //Controllo validità dei dati
    if( (vectorUsr.indexOf(req.body.username)!= -1) && (vectorPswrd.indexOf(req.body.password) != -1))
    {
        //Attivazione della sessione e caricamento pagina home
        req.session.success=true;
        console.log(req.body.username + " submitted Successfully!");
        console.log("POST HOME");
        res.status(200).render('home',{success: req.session.success});
    }
    else
    {
        //Ritorno alla pagina di login
        req.session.success = false;
        res.status(403).redirect('/');
    }
});

//Accesso home mediante GET
app.get('/home', function(req, res)
{
    //Verifico che l'utente abbia effettuato l'accesso
    if(req.session.success)
    {
        //Caricamento della pagina in caso affermativo
        console.log("GET HOME");
        res.status(200).render('home',{success: req.session.success});
    }
    else
    {   //Reindirizzamento alla pagina di login in caso negativo
        console.log("GET LOGIN");
        res.status(403).redirect('/');
    }
});

//Accesso alla zona segreteria
app.get('/segreteria', function(req,res)
{
    //Verifico che l'utente abbia effettuato l'accesso
    if(req.session.success)
    {
        //Caricamento della pagina in caso affermativo
        console.log("GET SEGRETERIA");
        res.status(200).render('segreteria',{success: req.session.success});
    }
    else
    {
        //Reindirizzamento alla pagina di login in caso negativo
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
            user: 'se2testingprj1@gmail.com',// utente che invia la mail
            pass: 'w6tc+5C]' // password dell'utente
        },
        tls:{
            rejectUnauthorized:false    //per il testing in localhost evita che la richiesta venga rifiutata
        }
    });
    // Creazione mail
    var mailOptions = {
        from: '"Domanda segreteria" <se2testingprj@gmail.com>', // mittente
        to: 'se2prjtestammi@gmail.com', // destinatario
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
    res.redirect('home');  //Ritorno alla home dopo l'invio del messaggio
});

//Gestione ricerca
app.get('/topic/:questionValue', function(req, res)
    {
        //Valore che verifica la validità della stringa inserita nella barra
        //di ricerca
        var error =false;
        //Verifico che l'utente abbia effettuato l'accesso
        if(req.session.success)
        {
            //Pagina da ricercare in base al valore inserito
            var topic = req.params.questionValue.toLowerCase();
            //Render che verifica la validità del valore inserito
            res.render(('topic/'+ topic),function (err)
            {
                //Se non esiste restituisce la pagina di errore
                if(err)
                {
                    //Valore di check messo a true
                    error= true;
                    console.log("GET PAGINA NON TROVATA");
                    res.status(404).render('pag_non_trovata',{success: req.session.success});
                }
            });
            // Se il render iniziale ha dato esito positivo viene caricata la pagina richiesta
            if(!error)
            {
              console.log("GET " + req.params.questionValue.toUpperCase());
              res.status(200).render('topic/'+ topic,{success: req.session.success});
            }
        }
        else
        {
            //Reindirizzamento alla pagina di login in caso negativo
            console.log("GET LOGIN");
            res.status(403).redirect('/');
        }
});

//Funzione di ascolto
app.listen(app.get('port'),function()
{
    console.log("Listening on port " + app.get('port'));
});
