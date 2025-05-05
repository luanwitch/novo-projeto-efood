import styled from 'styled-components'

import { colors } from '../../styles'

export const ButtonContainer = styled.button`
  background-color: ${colors.lightRed};
  color: ${colors.red};
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 10px;
  margin-top: auto; /* Empurra o botão para a parte inferior do Card */
  align-self: stretch; /* Faz o botão ocupar toda a largura disponível */
`
