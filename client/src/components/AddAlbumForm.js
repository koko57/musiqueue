import React, { Component } from 'react';
// import { graphql, compose } from 'react-apollo';
// import { getAlbums, add } from '../queries/queries';
import styled from 'styled-components';
import Button from './Button';
import { XCircle } from 'react-feather';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  margin: 1rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #f4f4f4;
  appearance: none;
  border: none;
  background: none;
  border-bottom: ${({ theme }) => theme.borders.border(theme.colors.grey)};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Message = styled.p`
  margin: 1.2rem auto;
  color: ${({ theme }) => theme.colors.red};
`;

class AddAlbumForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      message: false
    };
  }

  submitForm = e => {
    e.preventDefault();
    const { title, artist } = this.state;
    if (title && artist) {
      this.props.addAlbum({
        variables: {
          title: title.trim(),
          artist: artist.trim()
        },
        // refetchQueries: [{ query: getAlbums }]
      });
      this.setState({
        title: '',
        artist: ''
      });
    } else {
      this.setState({ message: true });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, message: false });
  };

  render() {
    const { onXClick } = this.props;
    const { title, artist, message } = this.state;
    return (
      <>
        <Form onSubmit={this.submitForm}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
          <Input
            type="text"
            name="artist"
            placeholder="Artist"
            value={artist}
            onChange={this.handleChange}
          />
          <ButtonsWrapper>
            <Button type="submit">Submit</Button>
            <XCircle onClick={onXClick} color="#d3d3d3"/>
          </ButtonsWrapper>
          {message && <Message>Both fields are required!</Message>}
        </Form>
      </>
    );
  }
}

// export default compose(graphql(add, { name: 'addAlbum' }))(AddAlbumForm);
export default AddAlbumForm;
