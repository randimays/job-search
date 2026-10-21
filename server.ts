import express from 'express';
import db from './db';

const app = express();
app.use(express.json());

app.get('/api/jobs', (req, res) => {
  const rows = db.prepare('SELECT * FROM jobs').all();
  res.json(rows);
});

app.post('/api/jobs', (req, res) => {
  const { company, title, url } = req.body;
  const result = db
    .prepare('INSERT INTO jobs (company, title, url) VALUES (?,?,?)')
    .run(company, title, url);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

app.listen(3001);