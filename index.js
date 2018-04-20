var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.set('port', (process.env.PORT || 3000));
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/FrontEnd');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));

// Carico pagina principale
app.get('/', function( req, res)
{
        console.log("GET LOGIN");
    res.render("login.html");
});

app.get('/home', function(req, res)
{
    console.log("GET HOME");
    res.render('home.html');
});

app.post('/home', function(req, res)
{
    var data = req.body.username + " " + req.body.password;
    console.log(data + ' Submitted Successfully!');
    console.log("POST HOME");
    res.render('home.html');
});

app.get('/segreteria', function(req,res)
{
    console.log("GET SEGRETERIA");
    res.render("segreteria.html");
});

/*app.get('/topic/erasmus', function(req,res)
{
    console.log("GET ERASMUMS");
    res.render("topic/erasmus.html");
});

app.get('/topic/laurea', function(req,res)
{
    console.log("GET LAUREA");
    res.render("topic/laurea.html");
});

app.get('/topic/tasse', function(req,res)
{
    console.log("GET TASSE");
    res.render("topic/tasse.html");
});

app.get('/topic/tirocini', function(req,res)
{
    console.log("GET TIROCINI");
    res.render("topic/tirocini.html");
});*/
app.get('/topic/:questionValue', function(req, res)
{
        console.log("GET " + req.params.questionValue);
        var topic = req.params.questionValue+".html";
        res.render(("topic/"+ topic),function (err, html)
            {
                if(err)
                {
                    res.render("segreteria.html");
                }
                res.send(html);
            }
        );
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
