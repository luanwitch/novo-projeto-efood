import styled, { createGlobalStyle } from 'styled-components'

export const colors = {
  red: '#E66767',
  lightRed: '#FFEBD9',
  white: '#FFFFFF',
  backgroudBody: '#FFF8F2',
  yellow: '#FFFF00',
  red2: '#8A0808'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  list-style: none;
}

body {
  background-color: ${colors.backgroudBody};
  color: ${colors.red};
}

img {
  max-width: 100%; /* Garantir que todas as imagens se ajustem ao tamanho do contêiner */
  height: auto; /* Manter a proporção das imagens */
  display: block; /* Evitar espaçamento indesejado abaixo da imagem */
}

@media (max-width: ${breakpoints.tablet}) {
  body {
    font-size: 14px; /* Ajustar o tamanho da fonte em telas menores */
  }
}
`

export const Container = styled.div`
  max-width: ${breakpoints.desktop};
  width: 100%;
  margin: 0 auto;
`
