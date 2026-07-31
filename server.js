import express from "express";

const port = 3000;;
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
]

app.get("/users", (req,res) => {
    res.status(200).json({
        teste: "OK",
        usuario: users
    });
});   

app.post("/users", (req,res) => {
    const {nome, email, sexo, telefone} = req.body;

    const newUsers = { 
    id: users.length + 1, 
    nome,
    email,
    sexo,
    telefone  
};
    users.push(newUsers);
    res.status(201).json({
        result: "Cadastro realizado com sucesso!",
        usuario: newUsers,
});
});

app.delete('/users/:id', (req,res) => {
    const qualId = Number(req.params.id);
    const removeUser = users.findIndex(users => users.id === qualId);
    users.splice(removeUser,1);
    
    res.status(200).json({
        resultado: "Usuario apagado",
        usuario: users
});
});

app.listen(port, host, () => {
    console.log(`Servediro rodando na porta ${port}`);
})