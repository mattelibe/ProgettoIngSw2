var request = require('supertest');
var app = require('./app');
var expressSes = require('express-session');
var vectorUsr = ['se2testingprj1@gmail.com'], vectorPswrd = ['w6tc+5C'];
app.use(expressSes({secret: 'gS3NyHfq70', saveUninitialized: false, resave: false}));

function checkCredentials(u, p)
{
  var check = false;
  if((vectorUsr.indexOf(u)!= -1) && (vectorPswrd.indexOf(p) != -1))
  {
    check = true;
  }
  return check;
}

describe(' Accesso alla pagina di login', () =>
{ test(' Dovrebbe rispondere con una GET', (done) =>
  {
      request(app).get('/').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe(' Accesso alla pagina della segreteria', () =>
{ test(' Dovrebbe rispondere con una GET', (done) =>
  {
      request(app).get('/segreteria').then((res) =>
      {
        expect(checkCredentials('se2testingprj1@gmail.com', 'w6tc+5C')).toBe(true);
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

/*describe(' Accesso alla home', () =>
{ test(' Dovrebbe rispondere con una POST', (done) =>
  {
      request(app).post('/home').then((res) =>
      {
        expect(checkCredentials('se2testingprj1@gmail.com', 'w6tc+5C')).toBe(true);
        .catch expect(res.statusCode).toBe(302);
        done();
        })
      })
  })
*/
