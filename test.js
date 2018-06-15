var request = require ('supertest');
var router = require('./index');
var express = require('express');

describe(' Accesso alla pagina di login', () =>
{ test(' Dovrebbe rispondere con una GET LOGIN', (done) =>
  {
      return request(router).get('/').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe(' Login valido', () =>
{ test(' Dovrebbe rispondere con una POST HOME', (done) =>
  {
      return request(router).post('/home').send(
        {username : 'se2testingprj1@gmail.com', password: 'w6tc+5C'})
        .then((res) =>
        {
            expect(res.statusCode).toBe(200);
            done();
        })
  })
});

describe(' Login non valido ', () =>
{ test(' Dovrebbe rispondere con DATI NON VALIDI', (done) =>
  {
      return request(router).post('/home').send(
        {username : 'invaliduser', password: 'invalidpassword'})
        .then((res) =>
        {
            expect(res.statusCode).toBe(302);
            done();
        })
  })
});

describe (' Accesso alla home', () =>
{ test(' Dovrebbe rispondere con una GET HOME', (done) =>
  {
      return request(router).get('/home').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe (' Accesso a topic erasmus', () =>
{ test(' Dovrebbe rispondere con una GET ERASMUS', (done, req) =>
  {
      return request(router).get('/topic/erasmus').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe (' Accesso a topic laurea', () =>
{ test(' Dovrebbe rispondere con una GET LAUREA', (done, req) =>
  {
      return request(router).get('/topic/laurea').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe (' Accesso a topic tasse', () =>
{ test(' Dovrebbe rispondere con una GET TASSE', (done, req) =>
  {
      return request(router).get('/topic/tasse').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});
describe (' Accesso a topic tirocini', () =>
{ test(' Dovrebbe rispondere con una GET TIROCINI', (done, req) =>
  {
      return request(router).get('/topic/tirocini').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});
describe (' Accesso a pagina non trovata', () =>
{ test(' Dovrebbe rispondere con una GET PAGINA NON TROVATA', (done, req) =>
  {
      return request(router).get('/topic/invalidstring').then((res) =>
      {
        expect(res.statusCode).toBe(404);
        done();
      })
  })
});

describe (' Accesso alla pagina della segreteria', () =>
{ test(' Dovrebbe rispondere con una GET SEGRETERIA', (done) =>
  {
      return request(router).get('/segreteria').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe (' Invio mail', () =>
{ test(' Dovrebbe rispondere con una MESSAGGIO INVIATO', (done) =>
  {
      return request(router).post('/send').send(
        {mesg: 'message'}).then((res) =>
      {
        expect(res.statusCode).toBe(500);
        done();
      })
  })
});
