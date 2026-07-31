import express from "express";

const port = 3000;
const host = "localhost";

const app = express();
app.use(express.json());

const users = [
  {
    id: 1, 
    nome: "Alice", 
    email: "alice@email.com", 
    sexo: "Feminino", 
    telefone: "0013428097"
  },
  {
    id: 2, 
    nome: "Clodoaldo", 
    email: "clodoaldoreidoasfalto@email.com", 
    sexo: "Masculino", 
    telefone: "0013528196"
  }
];

app.get("/users", (req, res) => {
  res.status(200).json({
    teste: "OK",
    usuario: users
  });
});   

app.post("/users", (req, res) => {
  const { nome, email, sexo, telefone } = req.body;

  const newUser = { 
    id: users.length + 1, 
    nome,
    email,
    sexo,
    telefone  
  };

  users.push(newUser);

  res.status(201).json({
    result: "Cadastro realizado com sucesso!",
    usuario: newUser
  });
});

app.delete("/users/:id", (req, res) => {
  const qualId = Number(req.params.id);
  const removeUser = users.findIndex(user => user.id === qualId);

  users.splice(removeUser, 1);
    
  res.status(200).json({
    resultado: "Usuário apagado",
    usuario: users
  });
});

app.patch("/users/:id", (req, res) => {
  const qualId = Number(req.params.id);
  const attUsers = users.findIndex(user => user.id === qualId);

  const { nome, email, sexo, telefone } = req.body;
  const userAtual = users[attUsers];

  const userAtualizado = { 
    id: userAtual.id, 
    nome: nome || userAtual.nome,
    email: email || userAtual.email,
    sexo: sexo || userAtual.sexo,
    telefone: telefone || userAtual.telefone
  };

  users.splice(attUsers, 1, userAtualizado);

  res.status(200).json({
    resultado: "Usuário atualizado",
    usuario: userAtualizado
  });
});

app.listen(port, host, () => {
  console.log(`Servidor rodando em ${host},${port}`);
});