import styled, { keyframes } from 'styled-components'

import { breakpoints, colors } from '../../styles'

import imgclose from '../../assets/image/lixeira-de-reciclagem 1.png'

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

export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 2;

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

  .empty-text {
    color: ${colors.yellow};
    font-size: 18px;
    font-weight: bold;
    line-height: 22px;
    text-align: center;
    animation: ${blink} 1s infinite; // Aplica a animação de piscar
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%; /* Ocupa toda a largura em telas menores */
    padding: 8px; /* Reduz o padding para telas menores */
  }
`

export const CartItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background-color: ${colors.lightRed};
  margin-top: 16px;
  margin-bottom: 16px;
  position: relative;

  > img {
    height: 80px;
    width: 80px;
    object-fit: cover;

    @media (max-width: ${breakpoints.tablet}) {
      height: 60px; /* Reduz o tamanho da imagem em telas menores */
      width: 60px;
    }
  }

  h3 {
    color: ${colors.red};
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 16px; /* Reduz o tamanho da fonte em telas menores */
    }
  }

  p {
    color: ${colors.red};
    font-size: 14px;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 12px; /* Reduz o tamanho da fonte em telas menores */
    }
  }

  > div:last-child {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
`
export const Prices = styled.p`
  font-size: 14px;
  color: ${colors.red};
  margin-bottom: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px; /* Reduz o tamanho da fonte em telas menores */
  }
`

export const PricesT = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.lightRed};
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px; /* Reduz o tamanho da fonte em telas menores */
  }
`

export const AlinPrices = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const Quantity = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.lightRed};
  margin-top: 16px;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px; /* Reduz o tamanho da fonte em telas menores */
  }
`

export const ButtonContainer = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
  margin-top: auto; /* Empurra os botões para o final do sidebar */

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

export const ButtonClose = styled.button`
  background-image: url(${imgclose});
  width: 16px;
  height: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
