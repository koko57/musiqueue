import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    height: 100vh;
    width: 100%;
}
h1, h2, h3, h4, h5, h6, p {
font-weight: normal;
color: #3f3f3f;
font-family: ${({ theme }) => theme.fonts.main};
}
h1 {
    text-transform: uppercase;
}
ul, ol {
    list-style: none;
}
`;
export default GlobalStyle;
