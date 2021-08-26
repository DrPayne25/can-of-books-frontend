import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Books from './Books'
import BookForm from './BookForm';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = { 
      headers: { "Authorization": `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email},
     };

    const serverResponse = await axios.get('http://localhost:3001/books', config);
    // console.log(serverResponse.data);
    this.setState({
      books: serverResponse.data,
    })
  }

  handleNewBook = async (bookInfo) => {
    try {
      let response = await axios.post('http://localhost:3001/books', bookInfo);
      const newBook = response.data
      this.setState({
        books: [...this.state.books, newBook]
      })
    } catch(err){
      console.log(err);
    }
  }

  handleDelete = async (id) => {
    try{
      const { getIdTokenClaims } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      const jwt = tokenClaims.__raw;
      const config = { 
        headers: { "Authorization": `Bearer ${jwt}` },
        params: { email: this.props.auth0.user.email}, 
      };
      await axios.delete(`http://localhost:3001/books/${id}`, config);
      let remainingBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: remainingBooks
      })
    }catch (err){
      console.log(err);
    }
  }

  handleUpdate = async (book) => {
    console.log(book._id);
    await axios.put(`http://localhost:3001/books/${book._id}`, book);
    const updateBooks = this.state.books.map(stateBook => {
      if(stateBook._id === book._id) {
        return book
      }
      else {
        return stateBook;
      }
    });
    this.setState({books: updateBooks})
  }

  // handleUpdate = async (book) => {
  //   try {
  //     const { getIdTokenClaims } = this.props.auth0;
  //     let tokenClaims = await getIdTokenClaims();
  //     const jwt = tokenClaims.__raw;
  //     const book = {
  //       headers: { "Authorization": `Bearer ${jwt}` },
  //       params: { email: this.props.auth0.user.email },
  //     };
  //     await axios.put(`http://localhost:3001/books/${book._id}}`, book);
  //     const updateBooks = this.state.books.map(stateBook => {
  //       if (stateBook._id === book._id) {
  //         return book
  //       }
  //       else {
  //         return stateBook;
  //       }
  //     });
  //     this.setState({ books: updateBooks })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  render() {
    // console.log(this.state.books);
    // console.log(this.props.auth0.user.email)
    return (
      <>
      <BookForm handleNewBook={this.handleNewBook}/>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.books.length > 0 ? <Books handleUpdate={this.handleUpdate} bookData={this.state.books} handleDelete={this.handleDelete}/> : <p>No Books Are Found</p>}
        {/* <Button className='Button' onClick={this.makeRequest}>Check the Server</Button> */}
      </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
