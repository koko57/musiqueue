import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { Button } from './Button';
import { XCircle } from 'react-feather';

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    margin-bottom: 2rem;
`;

const SInput = styled.input`
    margin: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #f4f4f4;
    appearance: none;
    background: transparent;
    border-bottom: ${({ theme }) => theme.borders.border(theme.colors.grey)};
`;

const SButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const SMessage = styled.p`
    margin: 1.2rem auto;
    color: ${({ theme }) => theme.colors.red};
`;

const ADD_ALBUM = gql`
    mutation addAlbum($title: String!, $artist: String!) {
        addAlbum(title: $title, artist: $artist) {
            title
            id
        }
    }
`;

export const AddAlbumForm = ({ onXClick }) => {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [addAlbum] = useMutation(ADD_ALBUM, {
        // TODO: caching
        update(cache, { data: { addAlbum } }) {
            cache.modify({
                fields: {
                    albums(existingAlbums = []) {
                        const newAlbumRef = cache.writeFragment({
                            data: addAlbum,
                            fragment: gql`
                                fragment NewAlbum on Album {
                                    title
                                    artist
                                }
                            `,
                        });
                        return [...existingAlbums, newAlbumRef];
                    },
                },
            });
        },
    });

    const submitForm = async (e) => {
        e.preventDefault();
        if (artist && title) {
            try {
                await addAlbum({ variables: { title, artist } });
            } catch (e) {
                setErrorMessage('Something went Wrong!');
            }
        } else {
            setErrorMessage('Both fields are required!');
        }
    };

    return (
        <>
            <SForm onSubmit={submitForm}>
                <SInput
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <SInput
                    type="text"
                    name="artist"
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => {
                        setArtist(e.target.value);
                    }}
                />
                <SButtonsWrapper>
                    <Button type="submit">Submit</Button>
                    <XCircle onClick={onXClick} color="#d3d3d3" />
                </SButtonsWrapper>
                {errorMessage && <SMessage>{errorMessage}</SMessage>}
            </SForm>
        </>
    );
};
