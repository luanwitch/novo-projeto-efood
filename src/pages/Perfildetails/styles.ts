import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; /* Menor que o modal, mas acima do resto */
  display: none;
  background-color: rgba(
    0,
    0,
    0,
    0.8
  ); /* Overlay escuro cobrindo toda a tela */

  &.visivel {
    display: block;
  }
`

export const Modal = styled.div`
  position: absolute; /* Posicionado na altura dos cards */
  left: 0;
  width: 100%;
  z-index: 1000; /* Acima do overlay */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 15px;
  box-sizing: border-box;
`

export const ModalContent = styled.div`
  background-color: ${colors.red};
  width: 100%;
  max-width: ${breakpoints.desktop};
  padding: 28px;
  position: relative;
  display: flex;
  flex-direction: row;

  header {
    position: absolute;
    top: 10px;
    right: 10px;

    img {
      width: 16px;
      height: 16px;
      cursor: pointer;

      @media (max-width: ${breakpoints.tablet}) {
        width: 15px;
        height: 15px;
      }
    }
  }

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    margin-right: 24px;

    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
      height: auto;
      margin-right: 0;
      margin-bottom: 16px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    h4 {
      font-size: 18px;
      font-weight: bold;
      color: ${colors.white};
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${colors.white};
      margin-bottom: 16px;
      text-align: justify;

      @media (max-width: ${breakpoints.tablet}) {
        font-size: 12px;
        line-height: 18px;
      }
    }

    button {
      width: 218px;
      height: 40px;
      background-color: ${colors.lightRed};
      color: ${colors.red};
      font-size: 14px;
      font-weight: bold;
      border: none;
      cursor: pointer;

      @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 16px;
  }
`
