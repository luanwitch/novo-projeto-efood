import styled from 'styled-components'

import { breakpoints, colors } from '../../styles'
import { InputGroupProps } from '../../types'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export const DeliContainer = styled.div`
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

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%; /* Ocupa toda a largura em telas menores */
    padding: 8px; /* Reduz o padding para telas menores */
    margin-right: 8px;
  }
`
export const Row = styled.div`
  display: block;
  margin-bottom: 56px;
`
export const InputGroup = styled.div<InputGroupProps>`
  label {
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    display: block;
  }

  input {
    max-width: ${(props) => props.maxWidth || '100%'};
    width: ${(props) => props.maxWidth || '100%'};
    height: 32px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.red};
    padding: 0 8px;
    margin: 0;
    border: none;
    outline: none;
    box-shadow: none;
    background-color: ${colors.lightRed};
    box-sizing: border-box;

    &::placeholder {
      opacity: 0.5;
    }

    &.error {
      border: 4px solid ${colors.red2};
    }
    @media (max-width: ${breakpoints.tablet}) {
      width: calc(${(props) => props.maxWidth || '100%'} - 24px);
    }
  }
`
export const CartContainer = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: space-between;
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
  margin-bottom: 16px;
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
