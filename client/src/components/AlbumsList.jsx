import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

const getAlbums = gql`
  {
    albums {
      name
      id
    }
  }
`;
const getArtists = gql`
  {
    artists {
      name
      origin
      id
    }
  }
`;

class AlbumsList extends Component {
  render() {
    const { data } = this.props;
    const loader = data.loading ? <div>Loading...</div> : null;
    let artists;
    data.loading ? artists = null : artists = data.artists.map(a => <li key={a.id}>{a.name}</li>)
    
    console.log(this.props);
    return (
      <>
        {loader}
        
        <div className="album-list">
          <ul>
            <li>album</li>
          </ul>
        </div>
        <div className="artist-list">
          <ul>
            {artists}
          </ul>
        </div>
      </>
    );
  }
}

export default compose(
    graphql(getAlbums, { name: "getAlbums" }),
    graphql(getArtists, { name: "getArtists" })
)(AlbumsList);
