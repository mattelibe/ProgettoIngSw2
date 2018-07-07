var express = require('express');
var bodyParser = require("body-parser");
var router = require('./router.js');
var app = express();
//Gestione dati statici (immagini, css)
app.use(express.static('public'));
//Gestione pagine da visualizzare e strumento di render
app.set('views', __dirname + '/FrontEnd');
//Gestore pagine html
app.set('view engine', 'ejs');
//Gestione informazioni url( login, ricerca)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Avvio router
router(app);
//Settaggio porta per gestione sia locale che su heroku
app.set('port', process.env.PORT || 4000);
//Funzione di ascolto
app.listen(app.get('port'),function()
{
    console.log("Listening on port " + app.get('port'));
});

module.exports = app;
