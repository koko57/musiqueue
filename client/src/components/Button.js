import styled from 'styled-components';

export const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  padding: 0.5rem 1rem;
  height: ${({ round }) => (round ? '2rem' : 'auto')};
  width: ${({ round }) => (round ? '2rem' : 'auto')};
  border-bottom: ${({ theme }) => theme.borders.border(theme.colors.grey)};
  border-radius: ${({ round }) => (round ? '50%' : '2rem')};
  line-height: 1.2rem;
`;

export default Button;
