import React, { useState } from 'react';
import { getBooksQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import BookDetails from './BookDetails';

function BookList(props) {
  let [state, setState] = useState(null);
  const { data, loading, error } = useQuery(getBooksQuery)
  var displayBooks = function () {
    if (loading) return (<div>Loading books ...</div>)
    return data && data.books.map(book => {
      return (
        <li key={book.id} onClick={(e) => {setState(book.id)}}>{book.name}</li>
      )
    })
  }
  return (
   <div>
     <ul id="book-list">
       {displayBooks()}
     </ul>
     <BookDetails bookId={state} />
   </div>
  );
}

export default BookList;
