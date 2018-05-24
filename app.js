var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var expressSes = require('express-session');
var app = express()
var vectorUsr = ['se2testingprj1@gmail.com'], vectorPswrd = ['w6tc+5C'];
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
//app.set('port', process.env.PORT || 3000);
var u,p;
app.get('/', function( req, res)
{
    req.session.success = false;
    console.log("GET LOGIN");
    res.status(200).render('login', {success: req.session.success});
});



app.post('/home', function(req, res)
{
    u = req.body.username;
    p = req.body.password;
    //Controllo validità dei dati
    if(checkCredentials(u,p))
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

app.get('/segreteria', function(req,res)
{
    //Verifico che l'utente abbia effettuato l'accesso
    if(checkCredentials(u,p))
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
//module.exports.checkCredentials = checkCredentials(u,p);
module.exports = app;
