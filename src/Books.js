import React from 'react'
import { Card } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'

class Books extends React.Component {
  renderBooks() {
    let arr = this.props.bookData.map((book, idx) => {
      return (
        <Carousel.Item key={idx}>
          <Card.Body>
            <Card.Title>Book Title: {book.title}</Card.Title>
              <Card.Text>Book Description: {book.description}</Card.Text>
              <Card.Text>Current Status: {book.status}</Card.Text>
              <Card.Text>Current User: {book.email}</Card.Text>
          </Card.Body>
        </Carousel.Item>
      )
    })
    return arr;
  }
  render() {
    return (
      <>
        <Carousel >
          {this.renderBooks()}
        </Carousel>
      </>
    )
  }
}

export default Books;
