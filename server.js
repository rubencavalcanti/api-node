const http = require('http'); //primeiro ele cria um serviço de http
const app = require('./app') // pega o arquivo app.js
const port = process.env.PORT || 3000; //define uma porta padrão
const server = http.createServer(app); //cria o servidor
server.listen(port); 

