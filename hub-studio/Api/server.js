const express = require('express');
const https = require('https');
const fs = require('fs');

//Trabalha com Arquivo XLSX (Excel)
const xlsx = require('xlsx');
//Bcrypt é uma lib para converter a senha do usuário em HASH (Ex: #S4424242%&*&*%%)
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');


// Carrega os certificados SSL
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};


//Inicializa o projeto
const app = express();
const port = 4000;
app.use(bodyParser.json())





// Função para ler usuários do arquivo Excel.
const readUsers = () => {

  //Armazena os dados de todas as planilhas existentes no documento dentro de WorkBook.
  const workbook = xlsx.readFile('./database/users.xlsx'); 

  //Workbook.SheetNames contém o nome de todas as planilhas do arquivo. Porém pegaremos a primeira [0] que é onde está a "tabela" de users.
  //Nesse arquivo apenas criei 1 tabela, se quisesse pegar a segunda planilha teria de usar [1] e sucessivamente.
  const sheetName = workbook.SheetNames[0]; 

  //Converte a planilha escolhida acima em Json.
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  //Retorna nosso objeto Json.
  return data;
};


// Rota de registro
app.post('/register', async (req, res) => {
   //Corpo da requisição que o usuário deverá enviar
  const { email, password, name, image } = req.body;

  //**** OBS devemos fazer depois aqui a validação caso enviem campos vazios. ****


  //Acessa nossa função acima que retorna nosso objeto JSON.
  const users = readUsers();

  // Verifica se o usuário já existe
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }


  //Caso o usuário não exista, realiza Hash da senha com 10 caracteres.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Adiciona o novo usuário ao Excel com a seguinte lógica:
   // - Como não é um DB nativo, devemos nos preocupar com a criação do ID.
  //  - No caso ele sempre vai verificar o tamanho da lista e somar +1, então assim teremos ID's em sequência.

  //Note que essa variável é um mini json da nossa tabela, criamos as chaves, id, username, password e email
  //Chaves que não foram atribuidas um valor aqui dentro, receberão o mesmo valor do req.body la em cima.
  const newUser = { id: users.length + 1, email, password: hashedPassword, name, image};

  //Add o novo usuário no nosos json Users
  users.push(newUser);

  //Cria uma variavel que armazenará a conversão do json editado novamente para planilha.
  const newWorksheet = xlsx.utils.json_to_sheet(users);

  //Cria uma planilha vazia para receber os dados do newWorkssheet acima.
  const newWorkbook = xlsx.utils.book_new();

  //Adiciona à planilha vazia os dados newRoksSheet como nome de Users
  xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Users');

  //Escreve no nosso arquivo local, a nossa nova planilha com os dados
  xlsx.writeFile(newWorkbook, './database/users.xlsx');

  res.status(201).json({ message: 'Usuário registrado com sucesso' });
});










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
