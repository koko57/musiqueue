import React from 'react';
import styled from 'styled-components';

const LoadingMessage = styled.p`
  margin: 3rem auto;
  font-size: 1.2rem;
`;

const Loader = () => {
  return <LoadingMessage>Loading...</LoadingMessage>;
};

export default Loader;
