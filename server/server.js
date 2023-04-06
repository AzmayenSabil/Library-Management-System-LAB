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


// Route to borrow a book
// app.post('/borrow', (req, res) => {
//   const bookId = req.body.bookId;
//   const borrowerId = req.body.borrowerId;

//   // Generate a new ID for the borrowing transaction
//   const transactionId = generateId();

//   // Update the book status in the database to 'borrowed'
//   connection.query(
//     'UPDATE books SET status = ?, borrower_id = ?, borrowed_date = ? WHERE id = ?',
//     ['borrowed', borrowerId, new Date(), bookId],
//     (err, results) => {
//       if (err) throw err;
//       console.log(`Book ${bookId} has been borrowed by user ${borrowerId}. Transaction ID: ${transactionId}`);
//       res.send(`Book ${bookId} has been borrowed by user ${borrowerId}. Transaction ID: ${transactionId}`);
//     }
//   );
// });

// Route to return a book
// app.post('/return', (req, res) => {
//   const bookId = req.body.bookId;

//   // Update the book status in the database to 'available'
//   connection.query(
//     'UPDATE books SET status = ?, borrower_id = NULL, borrowed_date = NULL, returned_date = ? WHERE id = ?',
//     ['available', new Date(), bookId],
//     (err, results) => {
//       if (err) throw err;
//       console.log(`Book ${bookId} has been returned.`);
//       res.send(`Book ${bookId} has been returned.`);
//     }
//   );
// });

// Function to generate a new unique ID
function generateId() {
  const timestamp = new Date().getTime().toString(16);
  const random = Math.floor(Math.random() * 10000).toString(16);
  return `${timestamp}-${random}`;
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
