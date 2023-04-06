import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowReturn.css'

import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';


const BorrowReturn = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [borrowBookId, setBorrowBookId] = useState('');
  const [returnBookId, setReturnBookId] = useState('');

  // Fetch all books from the backend on initial render
  useEffect(() => {
    axios.get('http://localhost:8080/books')
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Handle the borrow book form submission
  const handleBorrowSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/borrow', {
      bookId: borrowBookId
    })
      .then(res => {
        console.log(res.data);
        // Refresh the book list
        axios.get('http://localhost:8080/books')
          .then(res => {
            setBooks(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Handle the return book form submission
  const handleReturnSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/return', {
      bookId: returnBookId
    })
      .then(res => {
        console.log(res.data);
        // Refresh the book list
        axios.get('http://localhost:8080/books')
          .then(res => {
            setBooks(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }


  // Filter books based on the search term
  const filteredBooks = books.filter((book) => {
    return book.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
        <Navbar />
        <div>
            <h1>Borrow or Return Books</h1>
            <div className="search-container">
                <input type="text" placeholder="Search by title" onChange={(event) => {setSearchTerm(event.target.value)}} />
            </div>
            <div className="books-container">
                {filteredBooks.map((book) => (
                <div className="book-card" key={book.id}>
                    <h3 className='book-info'>{book.name}</h3>
                    <p className='book-info'>{book.author}</p>
                    <p className='book-info'>Genre: {book.genre}</p>
                    <form onSubmit={handleBorrowSubmit}>
                    <input type="hidden" value={book.id} onChange={(event) => {setBorrowBookId(event.target.value)}} />
                    <button type="submit">Borrow</button>
                    </form>
                    <form onSubmit={handleReturnSubmit}>
                    <input type="hidden" value={book.id} onChange={(event) => {setReturnBookId(event.target.value)}} />
                    <button type="submit">Return</button>
                    </form>
                </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
   
  );
};

export default BorrowReturn;
