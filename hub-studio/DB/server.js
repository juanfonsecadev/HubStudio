const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 4000;

// Carrega os certificados SSL
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Configura rotas
app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});

// Cria e inicia o servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server is running at https://localhost:${port}`);
});
