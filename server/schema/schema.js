const graphql = require('graphql');
const Album = require('../models/album');
const Artist = require('../models/artist');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve: async (parent, args) => {
        const artist = await Album.findById(parent.id).then(album => {
          return Artist.findOne({
            name: album.artist
          });
        });
        return artist;
      }
    }
  })
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return Album.find({ artist: parent.name });
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
        return Album.findById(args.id);
      }
    },
    artist: {
      type: ArtistType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Artist.findOne({ name: args.name });
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return Album.find({});
      }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(parent, args) {
        return Artist.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArtist: {
      type: ArtistType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let artist = new Artist({
          name: args.name
        });
        return artist.save();
      }
    },
    addAlbum: {
      type: AlbumType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        artist: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const newAlbum = await Artist.findOne({ name: args.artist })
          .then(found => {
            console.log(found);
            if (!found) {
              new Artist({ name: args.artist }).save();
            }
            return found;
          })
          .then(artist => {
            console.log(artist, 'art');
            let album = new Album({
              title: args.title,
              artist: artist.name
            });
            return album;
          });
        return newAlbum.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
