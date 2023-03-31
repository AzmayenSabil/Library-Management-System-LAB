import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

import Navbar from '../Navigation/Navbar'
import Footer from '../Footer/Footer'

const Home = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(5);

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: ''
  });
  const [editId, setEditId] = useState(null);

  // Fetch all books from the backend on initial render
  useEffect(() => {
    axios.get('http://localhost:8080/books')
      .then(res => {
        setBooks(res.data);
        //console.log("frontend data", res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, [books]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      name,
      author,
      genre
      // id: Math.random().toString(36).substring(7), // Generate a random ID for the book
    };
    axios.post('http://localhost:8080/books', newBook)
      .then(res => {
        setBooks([...books, res.data]);
        setName('');
        setAuthor('');
        setGenre('');
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = (bookId) => {
    axios.delete(`http://localhost:8080/books/${bookId}`)
      .then(res => {
        console.log(res.data);
        const updatedBooks = res.data.filter((book) => book.id !== bookId);
        setBooks(updatedBooks);
      })
      .catch(err => {
        console.log(err);
      });
  };


  const handleUpdate = (bookId) => {
    const bookToEdit = books.find(book => book.id === bookId);
    setName(bookToEdit.name);
    setAuthor(bookToEdit.author);
    setGenre(bookToEdit.genre);

    setFormData({
      name: bookToEdit.name,
      author: bookToEdit.author,
      genre: bookToEdit.genre
    });
    
    console.log("Book to edit", bookToEdit);

    axios.put(`http://localhost:8080/books/${bookId}`, bookToEdit)
      .then(res => {
        const updatedBooks = books.filter((book) => book.id == bookId);
        setBooks(updatedBooks);
      })
      .catch(err => {
        console.log(err);
      });

      handleDelete(bookId)
  };


  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const renderBooks = currentBooks.map((book) => (
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>
        <button onClick={() => handleDelete(book.id)}>Delete</button>
      </td>
      <td>
        <button onClick={() => handleUpdate(book.id)}>Update</button>
      </td>
    </tr>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      id={number}
      onClick={handlePageClick}
      className={currentPage === number ? "active" : null}
    >
      {number}
    </li>
  ));

  return (
    <div className='home-container'>
      <Navbar></Navbar>
      <div  className='main'>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            pattern="[A-Za-z]+"
          />

          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            pattern="[A-Za-z]+\s[A-Za-z]+"
          />

          <label htmlFor="genre">Genre:</label>
          <select id="genre" value={genre} onChange={(event) => setGenre(event.target.value)} required>
            <option value="">Select a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Novel">Novel</option>
            <option value="Non-fiction">Non-fiction</option>
          </select>

          <button type="submit">Add book</button>
        </form>

        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Actions 1</th>
                <th>Actions 2</th>
              </tr>
            </thead>
            <tbody>
              {renderBooks}
            </tbody>
          </table>
          <div>
            {renderPageNumbers}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default Home;
