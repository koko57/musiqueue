import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
padding: 0.5rem;
border-bottom:  ${({ theme }) => theme.borders.border(theme.colors.dark)};
margin: 0.5rem auto;
`;

const Album = ({id, title, artist}) => {
  return (
    <ListItem key={id}>
      <p>{title}</p>
      <p>{artist}</p>
    </ListItem>
  );
};

export default Album;
