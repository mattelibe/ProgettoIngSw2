var express = require('express');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var vectorUsr = ['se2testingprj1@gmail.com'];
var vectorPswrd = ['w6tc+5C'];
var token = null;
var secret = 'xivysga13';

var appRouter = function(app)
{
   //Middleware
   var apiRoutes = express.Router();

   //Verifica la validità del token
   apiRoutes.use(function(req, res, next)
   {
      //Se il token esiste
      if (token)
      {
         //Controlla che sia valido
         jwt.verify(token, secret, function(err, decoded)
         {
           //In caso negativo, rimanda alla pagina di login
           if (err)
           {
             return res.redirect('/');
           }
           else
           {
             // In caso affermativo procede con il caricamento della pagina
             // che segue la chiamata del middleware
             req.decoded = decoded;
             next();
           }
         });
      }
      else
      {
          //Nel caso il token non sia valido, rimanda al login
          return res.status(403).redirect('/');
      }
   });

   //Accesso alla pagina di login mediante GET
   app.get('/', function(req, res)
   {
            //Reset del token e caricamento login
            token=null;
            console.log("GET LOGIN");
            res.render('login');
   });

   //Accesso home mediante POST
   app.post('/home', function(req, res)
   {
       //Leggo i dati ricevuti dalla form
       var user = req.body.username;
       var pswrd = req.body.password;
       // Verifica delle credenziali per l'accesso
       if ((vectorUsr.indexOf(user) != -1) &&
          (vectorPswrd.indexOf(pswrd) != -1))
       {
           // Creazione del token e caricamento pagina home in caso
           // affermativo
           token = jwt.sign(user, secret);
           console.log("POST HOME");
           res.status(200);
           res.render('home');
       }
       else
       {
           // Se i dati non sono validi, si viene reindirizzati al login
           console.log("DATI NON VALIDI");
           res.status(403).redirect('/');
       }
   });

  // Accesso home mediante GET
  app.use('/home', apiRoutes);
  app.get('/home', function(req, res)
  {
            // Caricamento della pagina
            console.log("GET HOME");
            res.status(200).render('home');
  });
  // Gestione ricerca
  app.use('/topic/', apiRoutes);
  app.get('/topic/:questionValue', function(req, res)
  {
      // Valore che verifica la validità della stringa inserita nella barra
      // di ricerca
      var error = false;
      // Verifico che l'utente abbia effettuato l'accesso analizzando il token
          // Pagina da ricercare in base al valore inserito
          var topic = req.params.questionValue.toLowerCase();
          //Render che verifica la validità del valore inserito
          res.render(('topic/' + topic), function(err)
          {
              // Se non esiste restituisce la pagina di errore
              if (err)
              {
                  // Valore di check messo a true
                  error = true;
                  console.log("GET PAGINA NON TROVATA");
                  res.status(404).render('pag_non_trovata');
              }
          });
          // Se il render iniziale ha dato esito positivo viene caricata
          // la pagina richiesta
          if (!error)
          {
              console.log("GET " + req.params.questionValue.toUpperCase());
              res.status(200).render('topic/' + topic);
          }
  });
  // Accesso alla segreteria
  app.use('/segreteria', apiRoutes);
  app.get('/segreteria', function(req, res)
  {
      // Verifico che l'utente abbia effettuato l'accesso analizzando il token
      if (token)
      {
          // Caricamento della pagina in caso affermativo
          console.log("GET SEGRETERIA");
          res.status(200).render('segreteria');
      }
  });
  // Invio mail per la segreteria
  app.post('/send', function(req, res)
  {
      //Creazione gestore mail
      var transporter = nodemailer.createTransport(
      {
          host: 'smtp.gmail.com', // server che utilizza per l'invio
          port: 587,
          secure: false, // per la demo il fattore di sicurezza verrà omesso
          auth:
          {
              user: 'se2testingprj1@gmail.com', // utente che invia la mail
              pass: 'w6tc+5C]' // password dell'utente
          },
          tls:
          {
              rejectUnauthorized: false // per il testing in localhost evita
                                        // che la richiesta venga rifiutata
          }
      });
      // Creazione mail
      var mailOptions =
      {
          from: '"Domanda segreteria" <se2testingprj@gmail.com>', // mittente
          to: 'se2prjtestammi@gmail.com', // destinatario
          subject: 'Domanda segreteria', // Oggetto della mail
          text: req.body.mesg // Messaggio presente nel form della
                              // pagina della segreteria
      };
      // Invio mail
      transporter.sendMail(mailOptions, function(error, info)
      {
          //In caso di fallimento viene stampato un messaggio di errore
          if (error)
          {
              return console.log(error);
          }
      });
      console.log("MESSAGGIO INVIATO");
      res.statusCode(200).redirect('home'); //Ritorno alla home dopo l'invio del messaggio
  });
}
module.exports = appRouter;
