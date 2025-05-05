import styled from 'styled-components'

import { breakpoints } from '../../styles'

import HeaderBackImage from '../../assets/image/header_fundo.png'

export const HeaderBar = styled.header`
  background-image: url(${HeaderBackImage});
  text-align: center;
  background-size: cover;
  background-position: center;
  height: 254px;
  display: block;
  padding-top: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    padding-top: 20px; /* Reduz o padding superior */
  }
`

export const HeaderTitle = styled.h1`
  padding-top: 56px;
  font-size: 36px;
  font-weight: 900;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 28px; /* Reduz o tamanho da fonte para telas menores */
  }
`
export const LogoImage = styled.img`
  max-width: 100%; /* Garante que a imagem não exceda o contêiner */
  height: auto;
  display: block; /* Remove espaçamentos extras */
  margin: 0 auto; /* Centraliza a imagem horizontalmente */
`
