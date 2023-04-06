import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stats.css'

import Navbar from '../Navigation/Navbar';
import Footer from '../Footer/Footer';

const Stats = () => {
  const [books, setBooks] = useState([]);
  const [numBooks, setNumBooks] = useState(0);
  const [authorList, setAuthorList] = useState([]);
  const [commonAuthor, setCommonAuthor] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [numGenres, setNumGenres] = useState(0);

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

  // Calculate various statistics based on the books
  useEffect(() => {
    // Calculate number of books
    setNumBooks(books.length);

    // Calculate list of all authors and the most common author
    let authorCounts = {};
    let maxAuthorCount = 0;
    let commonAuthor = '';
    let authorList = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      authorList.push(book.author);
      if (authorCounts[book.author]) {
        authorCounts[book.author]++;
      } else {
        authorCounts[book.author] = 1;
      }
      if (authorCounts[book.author] > maxAuthorCount) {
        maxAuthorCount = authorCounts[book.author];
        commonAuthor = book.author;
      }
    }
    setAuthorList(authorList);
    setCommonAuthor(commonAuthor);

    // Calculate list of all genres and the number of genres
    let genreCounts = {};
    let numGenres = 0;
    let genreList = [];
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      genreList.push(book.genre);
      if (!genreCounts[book.genre]) {
        genreCounts[book.genre] = true;
        numGenres++;
      }
    }
    setGenreList(genreList);
    setNumGenres(numGenres);
  }, [books]);

  return (
    <div>
        <Navbar></Navbar>
        <div className="stats-container">
            <h1 className="stats-header">Book Stats</h1>

            <div className="stats-card">
                <h2 className="stats-card-header">Number of Books</h2>
                <hr />
                <p className="stats-card-data">{numBooks}</p>
            </div>

            <div className="stats-card">
                <h2 className="stats-card-header">Author List</h2>
                <hr />
                <p className="stats-card-data">{authorList.join(', ')}</p>
            </div>

            <div className="stats-card">
                <h2 className="stats-card-header">Most Common Author</h2>
                <hr />
                <p className="stats-card-data">{commonAuthor}</p>
            </div>

            <div className="stats-card">
                <h2 className="stats-card-header">Genre List</h2>
                <hr />
                <p className="stats-card-data">{genreList.join(', ')}</p>
            </div>

            <div className="stats-card">
                <h2 className="stats-card-header">Number of Genres</h2>
                <hr />
                <p className="stats-card-data">{numGenres}</p>
            </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default Stats;
