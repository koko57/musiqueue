import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAlbums, AddAlbum } from '../queries/queries';
import styled from 'styled-components';

const Input = styled.input`
  margin: 1rem auto;
  padding: 0.5rem;
  border: 1px solid #f4f4f4;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;

`;

class AddAlbumForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: ''
    };
  }
  submitForm = e => {
    e.preventDefault();
    this.props.AddAlbum({
      variables: {
        ...this.state
      },
      refetchQueries: [{ query: getAlbums }]
    });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Input
            type="text"
            name="artist"
            placeholder="Artist"
            value={this.state.artist}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default compose(graphql(AddAlbum, { name: 'AddAlbum' }))(AddAlbumForm);
