import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAlbums, add } from '../queries/queries';
import styled from 'styled-components';
import Button from './Button';
import X from './X';

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
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
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
    this.props.addAlbum({
      variables: {
        ...this.state
      },
      refetchQueries: [{ query: getAlbums }]
    });
    this.setState({
      title: '',
      artist: ''
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onXClick } = this.props;
    const { title, artist } = this.state;
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
            <X onClick={onXClick} rotate add />
          </ButtonsWrapper>
        </Form>
      </>
    );
  }
}

export default compose(graphql(add, { name: 'addAlbum' }))(AddAlbumForm);