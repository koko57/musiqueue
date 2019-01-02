import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAlbums, remove } from '../queries/queries';
import styled from 'styled-components';
import AddAlbumForm from './AddAlbumForm';
import Album from './Album';
import Loader from './Loader';
import X from './X';

const List = styled.ul`
  margin: 2rem auto;
`;

class AlbumsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false
    };
  }

  handleClick = e => {
    const id = e.target.parentNode.id;
    this.props.deleteAlbum({
      variables: {
        id
      },
      refetchQueries: [{ query: getAlbums }]
    });
  };

  addNew = () => {
    this.setState({ addNew: !this.state.addNew });
  };

  render() {
    const data = this.props.getAlbums;
    const { addNew } = this.state;
    let albums;
    if (data.loading === false && data.albums) {
      if (data.albums.length === 0) {
        albums = <li>No albums in your queue.</li>;
      } else {
        albums = data.albums.map(a => (
          <Album
            key={a.id}
            title={a.title}
            artist={a.artist.name}
            artistId={a.id}
            onXClick={this.handleClick}
          />
        ));
      }
    }
    return (
      <>
        {addNew && <AddAlbumForm onXClick={this.addNew} />}
        {!addNew && <X onClick={this.addNew} add />}
        <List>{albums}</List>
        {data.loading && <Loader />}
      </>
    );
  }
}

export default compose(
  graphql(getAlbums, { name: 'getAlbums' }),
  graphql(remove, { name: 'deleteAlbum' })
)(AlbumsList);
