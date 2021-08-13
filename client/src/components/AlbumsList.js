import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { PlusCircle } from 'react-feather';
import styled from 'styled-components';
import { AddAlbumForm } from './AddAlbumForm';
import Album from './Album';
import Loader from './Loader';

const SList = styled.ul`
    margin: 2rem auto;
`;

export const GET_ALBUMS = gql`
    query getAlbums {
        albums {
            title
            id
            artist {
                name
            }
        }
    }
`;

export const AlbumsList = () => {
    const { loading, error, data } = useQuery(GET_ALBUMS);

    const [addNew, setAddNew] = useState(false);

    const { albums } = data || {};

    const handleDelete = (id) => {
        console.log(id);
    };

    const toggleAddNewForm = () => setAddNew(!addNew);

    const renderAlbums = () => {
        if (albums?.length) {
            return albums.map((album) => (
                <Album
                    key={album.id}
                    title={album.title}
                    artist={album.artist.name}
                    artistId={album.id}
                    onXClick={() => handleDelete(album.id)}
                />
            ));
        } else {
            return <p>No albums in your queue.</p>;
        }
    };

    return (
        <>
            {loading && <Loader />}
            {error && <p>Error!</p>}
            {addNew ? (
                <AddAlbumForm onXClick={toggleAddNewForm} />
            ) : (
                <PlusCircle onClick={toggleAddNewForm} color="#d3d3d3" size={32} />
            )}
            <SList>{renderAlbums()}</SList>
        </>
    );
};
