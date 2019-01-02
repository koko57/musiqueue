import gql from 'graphql-tag';

export const add = gql`
  mutation addAlbum($title: String!, $artist: String!) {
    addAlbum(title: $title, artist: $artist) {
      title
      id
    }
  }
`;

export const remove = gql`
  mutation deleteAlbum($id: ID!) {
    deleteAlbum(id: $id) {
      id
    }
  }
`;

export const getAlbums = gql`
  {
    albums {
      title
      id
      artist {
        name
      }
    }
  }
`;

export const getArtists = gql`
  {
    artists {
      name
      id
    }
  }
`;
