import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class BookForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    let status = e.target.status.value;
    let email = this.props.auth0.user.email;
    this.props.handleNewBook({title, description, status, email});
  }

  render() {
    return (
      <Container id='formContainer'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label><h2>Add A Book</h2></Form.Label>
          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Book Description</Form.Label>
            <Form.Control type='text' />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Book Status</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default withAuth0(BookForm);
