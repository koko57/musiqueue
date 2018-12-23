import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAlbums, getArtists, del } from '../queries/queries';
import AddAlbumForm from './AddAlbumForm';
import Album from './Album';
import X from './X';

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
    if (!data.loading) {
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
    return (
      <>
        {addNew && <AddAlbumForm onXClick={this.addNew} />}
        {!addNew && <X onClick={this.addNew} add />}
        <div className="album-list">
          <ul>{albums}</ul>
        </div>
      </>
    );
  }
}

export default compose(
  graphql(getAlbums, { name: 'getAlbums' }),
  graphql(getArtists, { name: 'getArtists' }),
  graphql(del, { name: 'deleteAlbum' })
)(AlbumsList);
