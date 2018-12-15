const graphql = require('graphql');
const _ = require('lodash');
const albums = require('./data').albums;
const artists = require('./data').artists;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    year: { type: GraphQLInt },
    artist: {
      type: ArtistType,
      resolve(parent, args) {
        return _.find(artists, { id: parent.artistId });
      }
    }
  })
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    origin: { type: GraphQLString },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return _.filter(albums, { artistId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    album: {
      type: AlbumType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(albums, { id: args.id });
      }
    },
    artist: {
      type: ArtistType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(artists, { id: args.id });
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return albums;
      }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(parent, args) {
        return artists;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
