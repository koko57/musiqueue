import { gql } from 'apollo-boost';

export const AddAlbum = gql`
  mutation AddAlbum($title: String!, $artist: String!) {
    addAlbum(title: $title, artist: $artist) {
      title
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
