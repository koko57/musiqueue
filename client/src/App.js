import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Home } from './pages/Home';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
    cache: new InMemoryCache(),
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />
                        <Home />
                    </>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default App;
