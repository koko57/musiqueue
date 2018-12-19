import React, { Component } from 'react';
import AlbumsList from './components/AlbumsList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1 className="title">Musiqueque</h1>
          <h2 className="subtitle">Albums you want to listen to</h2>
          <AlbumsList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
