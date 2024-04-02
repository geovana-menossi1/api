const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pedidos",
});

app.use(bodyParser.json());

app.get('/api/motivos', async (req, res) => {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM motivos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/pedidos', async (req, res) => {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/pedidos', async (req, res) => {
  const { hora_saida_pedido, hora_entrada_pedido, data_pedido, nome_pedido, status_pedido, motivo, turmas_id_turma, utilizadores_id_utilizador } = req.body;
  try {
    await connection.execute('INSERT INTO pedidos (hora_saida_pedido, hora_entrada_pedido, data_pedido, nome_pedido, status_pedido, motivo, turmas_id_turma, utilizadores_id_utilizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [hora_saida_pedido, hora_entrada_pedido, data_pedido, nome_pedido, status_pedido, motivo, turmas_id_turma, utilizadores_id_utilizador]);
    res.status(201).json({ message: 'Pedido adicionado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
