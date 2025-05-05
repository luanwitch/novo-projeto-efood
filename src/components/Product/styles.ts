import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Card = styled.div`
  max-width: 472px;
  width: 100%;
  background-color: ${colors.white};
  margin-top: 50px;
  margin-bottom: 50px;
  position: relative;
  border: solid 1px ${colors.red};
  padding-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 217px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 200px;
  }
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.red};
  margin-left: 5px;
`

export const Score = styled.h3`
  font-weight: bold;
  font-size: 18px;
  color: ${colors.red};
  margin-left: auto;
  margin-right: 10px;
`

export const Star = styled.img`
  max-width: 4%;
  margin-right: 5px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 6%;
  }
`

export const OnLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 16px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin: 10px;
  text-align: justify;
  padding-bottom: 10px;
`

export const Category = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    top: 12px;
    right: 12px;
  }
`
