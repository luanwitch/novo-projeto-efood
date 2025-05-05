import styled from 'styled-components'

import { breakpoints, colors } from '../../styles'

export const SectionContainer = styled.div`
  max-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: ${colors.lightRed};
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Três colunas */
  gap: 20px;
  justify-items: center;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr); // Duas colunas para tablets
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(1, 1fr); // Uma coluna para smartphones
  }
`
