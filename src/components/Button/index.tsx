import React from 'react'

import * as S from './styles'

const Button = ({ type, title, to, onClick, children }: Props) => {
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
