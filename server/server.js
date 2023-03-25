const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'samyang@1234',
  database: 'lms'
});

app.use(express.json());

// Create a new book
app.post('/books', (req, res) => {
  console.log(req.body);
  const { name, author, genre } = req.body;
  connection.query('INSERT INTO books (name, author, genre) VALUES (?, ?, ?)', [name, author, genre], (error, results, fields) => {
    if (error) throw error;
    res.json({ id: results.insertId });
  });
});

// Retrieve a book by id
// app.get('/books/:id', (req, res) => {
//   console.log(id);
//   const { id } = req.params;
//   connection.query('SELECT * FROM books WHERE id = ?', [id], (error, results, fields) => {
//     if (error) throw error;
//     res.json(results[0]);
//   });
// });

// Update a book by id
app.put('/books/:id', (req, res) => {
  console.log("update ",req.params.id)
  const { id } = req.params;
  const { name, author, genre } = req.body;
  connection.query('UPDATE books SET name = ?, author = ?, genre = ? WHERE id = ?', [name, author, genre, id], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: `Book with id ${id} has been updated` });
  });
});

// Delete a book by id
app.delete('/books/:id', (req, res) => {
  console.log("delete ",req.params.id)
  const { id } = req.params;
  connection.query('DELETE FROM books WHERE id = ?', [id], (error, results, fields) => {
    if (error) throw error;
    res.json({ message: `Book with id ${id} has been deleted` });
  });
});

// Retrieve all books with pagination
app.get('/books', (req, res) => {
  //console.log("get all books")
  // const { page = 1, limit = 10 } = req.query;
  // const offset = (page - 1) * limit;
  connection.query('SELECT * FROM books', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
