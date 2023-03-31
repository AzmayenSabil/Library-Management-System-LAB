import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const Search = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  // Fetch all books from the backend on initial render
  useEffect(() => {
    axios
      .get('http://localhost:8080/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter the books based on the search term
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Update the search term when the user types in the search bar
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBooks.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='search-container'>
      <Navbar />
      <h1>Search for Books</h1>
      <form className='form'>
        <input
          type='text'
          placeholder='Search for books by name, author, or genre'
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <ul>
            {pageNumbers.map((number) => (
              <li
                key={number}
                id={number}
                onClick={handlePageClick}
                className={currentPage === number ? 'active' : null}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
