import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusCircle } from 'react-feather';
import { AlbumsList } from '../components/AlbumsList';
import { AddAlbumForm } from '../components/AddAlbumForm';

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
    const [addNew, setAddNew] = useState(false);

    const toggleAddNewForm = () => setAddNew(!addNew);

    return (
        <SMain>
            <STitle>
                <h1>Musiqueque</h1>
                <h2>Your next music discoveries</h2>
            </STitle>
            {addNew ? (
                <AddAlbumForm onXClick={toggleAddNewForm} />
            ) : (
                <PlusCircle onClick={toggleAddNewForm} color="#d3d3d3" size={32} />
            )}
            <AlbumsList />
        </SMain>
    );
};
