import React, { Component } from 'react';
import AlbumsList from './components/AlbumsList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 className="title">Musiqueque</h1>
      <h2 className="subtitle">Albums you want to listen to</h2>
      <AlbumsList />
      </div>
    );
  }
}

export default App;
