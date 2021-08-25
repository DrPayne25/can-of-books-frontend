import React from 'react'
import { Card, Button, Container, Modal} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import './Books.css';
import BookFormUpdate from './BookFormUpdate'

class Books extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      selectedBook: null
    }
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleShow = (book) => {
    this.setState({
      showModal: true,
      selectedBook: book,
    });
  }

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
              <Button id='button' onClick={() => this.handleShow(book)}>Update this</Button>
              <Button id='button' variant="outline-danger" onClick={() => this.props.handleDelete(book._id)}>Delete this</Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      )
    })
    return arr;
  }
  render() {
    console.log('BookForm:', this.state);
    return (
      <>
        <Container>
          <Carousel >
            {this.renderBooks()}
          </Carousel>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                {
                  this.state.selectedBook ? 
                  <BookFormUpdate handleClose={this.handleClose} book={this.state.selectedBook} handleUpdate={this.props.handleUpdate} />
                : ''}
              </Modal.Body>
            </Modal>
        </Container>
      </>
    )
  }
}

export default Books;
