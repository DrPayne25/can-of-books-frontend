import React from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import './Books.css';

class Books extends React.Component {
  renderBooks() {
    let arr = this.props.bookData.map((book, idx) => {
      return (
        <Carousel.Item key={book._id}>
          <Card className="BookCard">
            <Card.Body>
              <Card.Title>Book Title: {book.title}</Card.Title>
              <Card.Text>Book Description: {book.description}</Card.Text>
              <Card.Text>Current Status: {book.status}</Card.Text>
              <Card.Text>Current User: {book.email}</Card.Text>
              <Button id='button' variant="outline-danger" onClick={() => this.props.handleDelete(book._id)}>Delete this</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      )
    })
    return arr;
  }
  render() {
    return (
      <>
        <Container>
          <Carousel >
            {this.renderBooks()}
          </Carousel>
        </Container>
      </>
    )
  }
}

export default Books;
