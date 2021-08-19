import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount = async () => {

    const serverResponse = await axios.get('http://localhost:3001/books');
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
    console.log(this.state);
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <Button onClick={this.makeRequest}>Check the Server</Button>
        <p>Check the Console for this request</p>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
