import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is live and running!');
});

app.get('/todos', (req, res) => { 
    db.query('SELECT * FROM todos', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(rows);
    });
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    const { todo } = req.body;
    db.query('INSERT INTO todos (title) VALUES (?)', [todo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json({ id: result.insertId, todo });
    });
});

app.get('/nodeJsTodo', (req, res) => { 
    db.query('INSERT INTO todos (title) VALUES ("Learn Node.js")', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(result);
    });
});


app.listen(3000, () => { 
    console.log('Server is running on http://localhost:3000');
});


console.log('Hello, World!');

