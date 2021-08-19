import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Books from './Books'
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount = async () => {
    const { getIdTokenClaims } = this.props.auth0
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = { headers: { "Authorization": `Bearer ${jwt}` } };

    const serverResponse = await axios.get('http://localhost:3001/books', config);
    console.log(serverResponse.data);
    this.setState({
      books: serverResponse.data,
    })
  }

  makeRequest = async () => {

    const { getIdTokenClaims } = this.props.auth0
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = { headers: { "Authorization": `Bearer ${jwt}` } };

    const serverResponse = await axios.get('http://localhost:3001/test', config);
    console.log(serverResponse);

  }

  render() {
    console.log(this.state.books);
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.books.length > 0 ? <Books bookData={this.state.books}/> : <p>No Books Are Found</p>}
        <Button onClick={this.makeRequest}>Check the Server</Button>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
