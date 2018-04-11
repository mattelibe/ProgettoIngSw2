var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.set('port', (process.env.PORT || 3000));
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/FrontEnd');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require('fs');
var path = "";

// Carico pagina principale
app.get('/', function( req, res)
{
    res.render("login.html");
});

app.post('/home', function(req, res)
{
    /*var data = req.body.username + " " + req.body.password;
    console.log(data + ' Submitted Successfully!');*/
    res.render('home.html');
});

app.get('/topic/t1', function(req,res)
{
    res.render("topic/t1.html");
});


/*app.get('/topic/:questionValue', function(req, res)
{
        console.log(req.params.questionValue);
        var topic = +req.params.questionValue+".html";
        res.render("/topic/"+ topic);
        //res.redirect(301, topic);
});*/

app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
