import React, { Component } from 'react';
import AlbumsList from './components/AlbumsList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const Main = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Main>
              <Title>
                <h1>Musiqueque</h1>
                <h2>Your next music discoveries</h2>
              </Title>
              <AlbumsList />
            </Main>
          </>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
