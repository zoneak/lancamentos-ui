/*
 * Para testar com o express, primeiro alterar o environment.prod.ts para urls locais conforme abaixo:
 *
 *  export const environment = {
 *   production: true,
 *   apiUrl: 'http://localhost:8082',
 *   allowedDomains: [ /localhost:8082/ ],
 *   disallowedRoutes: [/\/oauth\/token/]
 *  };
 *
 * Gerar um build pelo ng build
 * Em seguida, rodar este arquivo no prompt pelo comando: node server.js
 * Assim estaremos acessando os arquivos gerados no build para testarmos
 * Não esquecer de retornar as configs do environment.prod para os endereços de prod e gerar o build novamente após os testes
*/

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/lancamentos-ui'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/lancamentos-ui/index.html');
});

app.listen(process.env.PORT || 4200);
