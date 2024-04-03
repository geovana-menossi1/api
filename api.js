const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');

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
    const dataPedido = req.query.data_pedido; 
    let query = 'SELECT * FROM pedidos';
    let params = [];

    if (dataPedido) {
      query += ' WHERE data_pedido = ?';
      params.push(dataPedido);
    }

    const [rows, fields] = await connection.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  res.sendFile(path.resolve('../front-end/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
