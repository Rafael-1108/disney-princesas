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

//Buscar pelo id desejado no array/objeto/json
const princesa = princesas.find(p => p.id === id);

//Verificar se a princesa existe
if (princesa) {

//Se existir enviar na resposta com o res e o status 200
res.status(200).json(princesa);
} else {

//Se não existir, enviar uma resposta e o status 404
res.status(404).json({
mensagem: `Princesa com o id: ${id} não encontrada!`
    }) 
  }
});

app.get("/princesas/nome/:nome", (req, res) => {

// Obtém o parâmetro 'nome' da URL e o converte para letras minúsculas. 
const nome = req.params.nome.toLowerCase();

//Buscar pelo nome no array/objeto/json. Percorre cada item do array o array (princesas.find) 
//e pega o nome de uma princesa específica e o converte para letras minúsculas (p.nome.toLowerCase()). 
const nomePrincesa = princesas.find(p => p.nome.toLowerCase() === nome);

// Verificar se existe
if (nomePrincesa) {

//Se existir enviar na resposta com o res e o status 200
res.status(200).json(nomePrincesa);
} else {

//Se não existir, enviar uma resposta e o status 404
res.status(404).json({
mensagem: `Princesa com o nome ${nome} não encontrada!`
    }) 
  }
});

app.get("/princesas/reino/:reino", (req, res) => {
  const reino = req.params.reino.toLowerCase();
  const reinoPrincesas = princesas.find(r => r.reino.toLowerCase() === reino);

  if (reinoPrincesas) {
    res.status(200).json(reinoPrincesas)
  } else {
    res.status(404).json({
    mensagem: `Princesa do reino ${reino} não encontrada.`
    })
  }
});

app.get("/princesas/ativas/sim", (req, res) => {
  const princesasAtivas = princesas.filter(p => p.ativa === true);
  if (princesasAtivas) {
  res.status(200).json(princesasAtivas)
} else {
  res.status(404).json({
  mensagem: "Não existem princesas ativas"
  });
}
});

app.listen(serverPort, () => {
    console.log(`http://localhost:${serverPort}`)
});