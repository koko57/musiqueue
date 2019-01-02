import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    font-weight: normal;
    color: #3f3f3f;
    font-family: ${({ theme }) => theme.fonts.main};
  }

  h1 {
    text-transform: uppercase;
  }

  ul,
  ol {
    list-style: none;
  }
  
  button,
  input {
    font-size: 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
  }
`;

export default GlobalStyle;
