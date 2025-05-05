import styled, { keyframes } from 'styled-components'

import { breakpoints, colors } from '../../styles'

// Animação de piscar
const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
  z-index: 1;
`

export const FaseEnd = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 2;
  color: ${colors.lightRed};

  h3 {
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 100;
  }

  &.is-open {
    display: flex;
  }
`

export const Sidebar = styled.aside`
  max-width: 360px;
  width: 100%;
  height: 100%; /* Altura total da tela */
  max-height: 100vh; /* Altura máxima da viewport */
  padding: 16px;
  background-color: ${colors.red};
  z-index: 3;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Ativa o scroll vertical quando necessário */

  h3,
  h4 {
    margin-bottom: 24px;
    white-space: nowrap; // Impede a quebra de linha
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%; /* Ocupa toda a largura em telas menores */
    padding: 8px; /* Reduz o padding para telas menores */
  }
`

export const TextEnd = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin-top: 16px;
  text-align: justify;
`

export const ButtonContainer = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
  margin-top: 32px; /* Empurra os botões para o final do sidebar */

  div {
    padding-bottom: 8px;
  }
`

export const ButtonCart = styled.button`
  background-color: ${colors.lightRed};
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  color: ${colors.red};
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.red};
    color: ${colors.lightRed};
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px; /* Reduz o tamanho da fonte em telas menores */
    padding: 6px; /* Reduz o padding em telas menores */
  }
`

export const Completed = styled.strong`
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap; // Impede a quebra de linha
`

export const Content = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.yellow};
  animation: ${blink} 1s infinite; // Aplica a animação de piscar
  white-space: nowrap; // Impede a quebra de linha
`
