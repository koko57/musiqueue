import React from 'react';
import styled from 'styled-components';

export const SButton = styled.button`
    appearance: none;
    background: transparent;
    padding: 0.5rem 1rem;
    height: ${({ round }) => (round ? '2rem' : 'auto')};
    width: ${({ round }) => (round ? '2rem' : 'auto')};
    border: ${({ theme }) => theme.borders.border(theme.colors.grey)};
    border-radius: ${({ round }) => (round ? '50%' : '2rem')};
    line-height: 1.2rem;
`;

export const Button = ({ children, type }) => {
    return <SButton type={type}>{children}</SButton>;
};
