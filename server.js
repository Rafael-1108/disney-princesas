import express from "express";
import princesas from "./src/data/princesas.js";

const app = express();
const serverPort = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send`Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑`
});

//Rota princesas
app.get("/princesas", (req, res) => {
    res.json(princesas);
});

app.get("/princesas/id/:id", (req, res) => {
    let id = req.params.id;

//Transformando id (string) em numero;
id = parseInt(id)

// Buscar no array/objeto/json
const princesa = princesas.find(p => p.id === id);

// Verificar se existe
if (princesa) {

//Se existir enviar na resposta com o res e o status 200
res.status(200).json(princesa);
} else {

//Se não existir, enviar uma resposta e o status 404
res.status(404).json({
mensagem: "Princesa não encontrada!"
    }) 
  }
});

app.get("/princesas/nome/:nome", (req, res) => {
    const nome = req.params.nome.toLowerCase();

// Buscar no array/objeto/json
const nomePrincesa = princesas.find(p => p.nome.toLowerCase() === nome);

// Verificar se existe
if (nomePrincesa) {

//Se existir enviar na resposta com o res e o status 200
res.status(200).json(nomePrincesa);
} else {

//Se não existir, enviar uma resposta e o status 404
res.status(404).json({
mensagem: "Princesa não encontrada!"
    }) 
  }
});

app.listen(serverPort, () => {
    console.log(`http://localhost:${serverPort}`)
})