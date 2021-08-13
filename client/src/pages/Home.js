import React from 'react';
import styled from 'styled-components';
import AlbumsList from '../components/AlbumsList';

const SMain = styled.div`
    max-width: 800px;
    margin: 5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const STitle = styled.div`
    margin-bottom: 2rem;
    text-align: center;
`;

export const Home = () => {
    return (
        <SMain>
            <STitle>
                <h1>Musiqueque</h1>
                <h2>Your next music discoveries</h2>
            </STitle>
            <AlbumsList />
        </SMain>
    );
};
