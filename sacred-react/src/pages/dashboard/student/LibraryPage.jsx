import React, { useState, useEffect } from 'react';
import '../../../style/pages_css/dashboard/student_css/libraryPage.css';
import { FaFilePdf, FaEye, FaRegEyeSlash, FaSearch, FaBook } from 'react-icons/fa'; // Import icons
import { Student_View_Library } from '../../../api_Data/student_api';
import BackButton from '../../../components/BackButton';

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null); // Track the selected book for viewing PDF
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await Student_View_Library();
        console.log(response);
        const booksData = response.data || [];
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleViewDetails = (bookId) => {
    setSelectedBookId(bookId === selectedBookId ? null : bookId); // Toggle PDF visibility
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <BackButton />

      <div className="library-container">
        <h2 className="library-title">
          <FaBook /> Library
        </h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Books List */}
        <div className="books-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book-item">
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>

                  {/* Button to toggle PDF visibility */}
                  <button
                    className="details-btn"
                    onClick={() => handleViewDetails(book.id)}
                  >
                    {selectedBookId === book.id ? (
                      <>
                        <FaRegEyeSlash /> Hide PDF
                      </>
                    ) : (
                      <>
                        <FaEye /> View PDF
                      </>
                    )}
                  </button>

                  {/* Conditionally show the link to the PDF */}
                  {selectedBookId === book.id && (
                    <div className="pdf-links">
                      <a
                        href={`http://127.0.0.1:8000${book.pdf_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-btn"
                      >
                        <FaFilePdf /> Open PDF in new tab
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-books">No books found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LibraryPage;