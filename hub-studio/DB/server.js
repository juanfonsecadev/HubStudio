const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');

app.use(bodyParser.json())


const users = JSON.parse(fs.readFileSync('./fake-db.json', 'utf-8'));


// Carrega os certificados SSL
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};


// Configura rotas
app.post('/login', (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const usuario = users.find(user => user.email === email);

  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  res.json({ message: 'Login realizado com sucesso!', usuario: {
    nome: usuario.nome,
    email: usuario.email,
    profilePic: usuario.profilePic,
  } 
 });

});

// Cria e inicia o servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server is running at https://localhost:${port}`);
});
