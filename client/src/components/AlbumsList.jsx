import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAlbums, getArtists } from '../queries/queries';
import AddAlbumForm from './AddAlbumForm';
import Album from './Album';


class AlbumsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNew: false
    };
  }
  render() {
    const data = this.props.getAlbums;
    const loader = data.loading ? <div>Loading...</div> : null;
    let albums;
    data.loading
      ? (albums = null)
      : (albums = data.albums.map(a => (
          <Album key={a.id} title={a.title} artist={a.artist.name} />
        )));

    console.log(this.props);
    const { addNew } = this.state;
    return (
      <>
        {loader}
        <button onClick={() => this.setState({ addNew: !addNew })}>
          {addNew ? 'Close' : 'Add New'}
        </button>
        {this.state.addNew && <AddAlbumForm />}
        <div className="album-list" />
        <div className="artist-list">
          <ul>{albums}</ul>
        </div>
      </>
    );
  }
}

export default compose(
  graphql(getAlbums, { name: 'getAlbums' }),
  graphql(getArtists, { name: 'getArtists' })
)(AlbumsList);
