import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

class BookFormUpdate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props.book._id,
      title: this.props.book.title,
      description: this.props.book.description,
      status: this.props.book.status,
      email: this.props.auth0.user.email,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('In Handle Submit:', this.state)
    this.props.handleUpdate(this.state);
    this.props.handleClose();
  }

  handleTitle = (e) => {
    e.preventDefault();
    this.setState({
      title: e.target.value
    })
  }

  handleDescription = (e) => {
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }

  handleStatus = (e) => {
    e.preventDefault();
    this.setState({
      status: e.target.value
    })
  }
  

  render() {
    console.log('bookFormUpdateState:', this.state)
    return (
      <Container id='formContainer'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label><h2>Update A Book</h2></Form.Label>
          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type='text' onChange={this.handleTitle} value={this.state.title}/>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Book Description</Form.Label>
            <Form.Control type='text' onChange={this.handleDescription} value={this.state.description}/>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Book Status</Form.Label>
            <Form.Control type='text' onChange={this.handleStatus} value={this.state.status}/>
          </Form.Group>
          <Button type='submit'>Update</Button>
        </Form>
      </Container>
    )
  }
}

export default withAuth0(BookFormUpdate);
