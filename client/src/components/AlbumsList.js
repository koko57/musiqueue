import React from 'react';
import styled from 'styled-components';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Album } from './Album';
import { Loader } from './Loader';

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

export const DELETE_ALBUM = gql`
    mutation deleteAlbum($id: ID!) {
        deleteAlbum(id: $id) {
            id
        }
    }
`;

export const AlbumsList = () => {
    const { loading: queryLoading, error: queryError, data } = useQuery(GET_ALBUMS);

    const [deleteAlbum, { loading: mutationLoading, error: mutationError }] = useMutation(
        DELETE_ALBUM,
        {
            refetchQueries: ['getAlbums'],
        },
    );

    const { albums } = data || {};

    const loading = queryLoading || mutationLoading;

    const handleDelete = async (id) => {
        await deleteAlbum({ variables: { id } });
    };

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
        }
        return <p>No albums in your queue.</p>;
    };

    const renderErrorMessage = (errors) => {
        if (errors?.graphQLErrors) {
            return errors.map(({ message }, i) => <span key={i}>{message}</span>);
        }
        return [];
    };

    const renderAllErrorMessages = () => {
        const mutationErrors = renderErrorMessage(mutationError?.graphQLErrors);
        const queryErrors = renderErrorMessage(queryError?.graphQLErrors);

        return [...mutationErrors, ...queryErrors];
    };

    return (
        <>
            {loading && <Loader />}
            <>{renderAllErrorMessages()}</>
            <SList>{renderAlbums()}</SList>
        </>
    );
};
