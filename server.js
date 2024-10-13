const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'PvZ'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

app.get('/plants', (req, res) => {
  const query = 'SELECT * FROM plants';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération des données');
    }
    res.json(result);
  });
});

app.get('/plant/:name', (req, res) => {
  const plantName = req.params.name;
  
  const query = 'SELECT * FROM plants WHERE name = ?';
  db.query(query, [plantName], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});


app.get('/zombies', (req, res) => {
  const query = 'SELECT * FROM zombies';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération des données');
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});