import React, { Component } from 'react';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import styled from 'styled-components';
import AlbumsList from './components/AlbumsList';

const link = createPersistedQueryLink().concat(
  createHttpLink({ uri: '/graphql', credentials: 'same-origin' })
);
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
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
