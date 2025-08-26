import React from 'react'
import * as S from './styles'

import { ButtonProps } from '../../types'

const Button = ({ type, title, to, onClick, children }: ButtonProps) => {
  if (type === 'button') {
    return (
      <S.ButtonContainer type="button" title={title} onClick={onClick}>
        {children}
      </S.ButtonContainer>
    )
  }

  return (
    <S.ButtonLink to={to as string} title={title}>
      {children}
    </S.ButtonLink>
  )
}

export default Button
