import styled from 'styled-components'

import { breakpoints } from '../../styles'

export const SectionContainer = styled.div`
  max-width: 100%;
  padding: 0; /* Padding horizontal para evitar o overflow */
  margin: 0;
  box-sizing: border-box;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 10px; /* Ajuste para telas menores */
  }
`

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center; /* Centralizar a lista de produtos */
`
