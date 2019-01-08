import React from 'react';
import styled from 'styled-components';
import { XCircle } from 'react-feather';

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
      <XCircle onClick={onXClick} color="#d3d3d3"/>
    </ListItem>
  );
};

export default Album;
