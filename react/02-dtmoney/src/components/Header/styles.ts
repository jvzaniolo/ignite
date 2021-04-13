import styled from 'styled-components'

export const Container = styled.header`
  background: var(--purple);
`

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;

  display: flex;
  align-items: center;
  padding: 2rem 1rem 10rem;
  justify-content: space-between;

  > button {
    border: 0;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 2rem;
    border-radius: 0.25rem;
    background: var(--purple-light);

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
