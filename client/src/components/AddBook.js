import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


const AddBlock = (props) => {
  let defaultState = {
    name: '',
    genre: '',
    authorId: ''
  };
  const [state, setState] = useState(defaultState);
  let optionss = <option></option>
  const { data, loading, error } = useQuery(getAuthorsQuery);
  const [ addBook ] = useMutation(addBookMutation);
 
  const displayAuthors = () => {
    if (loading) return <option>Loading ...</option>
    return data && data.authors.map(author => {
      return <option key={author.id} value={author.id}>{author.name}</option>
    })
  }
  const submitForm = (e) => {
    e.preventDefault();
    console.log('statess', state)
    addBook({
      variables: { 
        name: state.name,
        genre: state.genre,
        authorId: state.authorId
       },
       refetchQueries: [{query: getBooksQuery}]
    })
    setState({ ...defaultState })
  }
  return (
    <form id="add-block" onSubmit={submitForm}>
      <div className="field">
        <label>Book name: </label>
        <input type="text" onChange={(e) => setState({ ...state, name: e.target.value })}/>
      </div>
      <div className="field">
        <label>Genre: </label>
        <input onChange={(e) => setState({...state, genre: e.target.value })} type="text" />
      </div>
      <div className="field">
        <label>Author: </label>
       <select onChange={(e) => setState({...state, authorId: e.target.value })}>
         <option>Select author</option>
         {displayAuthors()}
       </select>
      </div>

      <button>+</button>

    </form>
   );
}
 
export default AddBlock;