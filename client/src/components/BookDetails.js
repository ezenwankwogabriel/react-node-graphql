import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getBookQuery } from '../queries/queries';
import BookList from './BookList';

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
          id: props.bookId
        }
  })
  function bookList() {
    return data && data.book ? (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.authorId && data.book.authorId.name}</p>
        <p>All books by this author: </p>
        <ul className="other-books">
          {data.book.authorId && data.book.authorId.books.map(item => {
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>

      </div>
    ) : (
      <div id="book-details">
        <p>Book details go here</p>
      </div>
    )
  }
  return (
    <div id="book-details">
      {bookList()}
    </div>
   );
}
 
export default BookDetails;
