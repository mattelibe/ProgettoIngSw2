var request = require ('supertest');
var router = require('./index');
var express = require('express');

describe('Accedo alla pagina di login', () =>
{ test('Ritorna la pagina di login', (done) =>
  {
      return request(router).get('/').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

describe('Login effettuato', () =>
{ test('Ritorna la pagina della home', (done) =>
  {
      return request(router).post('/home').send(
        {username : 'username@mail.com', password: 'password'})
        .then((res) =>
        {
            expect(res.statusCode).toBe(200);
            done();
        })
  })
});


//stringa vuota

var emptyString= " ";
var topictypo =  ['LauREa','lauREa','LAureA','laUREa','ErAsMus','EraSMUS','erASMus','eRAsmUS',
'TAssE','tASsE','taSSE','TASSe','TirOCINi','tIrOCIni','tIrOCinI','TIRociNI'];

describe (' Ricerca con una stringa vuota', () =>
{ test('Viene rimandato a pagina non trovata', (done, req) =>
  {
      return request(router).get('/topic/'+emptyString+'').then((res) =>
      {
        expect(res.statusCode).toBe(404);
        done();
      })
  })
});


//topic

describe (' Accesso a topic con typo di maiuscole e minuscole', () =>
{ topictypo.forEach(topic => {
  
  test(' Dovrebbe rispondere con la get del topic cercato', (done, req) =>
  {
      return request(router).get('/topic/'+topic+'').then((res) =>
      {
        expect(res.statusCode).toBe(200);
        done();
      })
  })}
)});