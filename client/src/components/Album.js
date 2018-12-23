import React from 'react';
import styled from 'styled-components';
import X from './X';

const ListItem = styled.li`
  padding: 0.5rem;
  border-bottom: ${({ theme }) => theme.borders.border(theme.colors.grey)};
  margin: 1rem auto;
  min-width: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.4rem;
  width: 250px;
`;

const Album = ({ artistId, title, artist, onXClick }) => {
  return (
    <ListItem key={artistId} id={artistId}>
      <div>
        <p>{title}</p>
        <p>{artist}</p>
      </div>
      <X onClick={onXClick} rotate />
    </ListItem>
  );
};

export default Album;
