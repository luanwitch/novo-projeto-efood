import { Link } from 'react-router-dom'

import { ButtonContainer } from './styles'

type Props = {
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const ButtonPerfil = ({ title, to, onClick, children }: Props) => {
  if (to) {
    // Se `to` estiver definido, renderiza um Link para navegação
    return (
      <Link to={to} title={title}>
        <ButtonContainer>{children}</ButtonContainer>
      </Link>
    )
  }

  // Caso contrário, renderiza como um botão normal
  return (
    <ButtonContainer type="button" title={title} onClick={onClick}>
      {children}
    </ButtonContainer>
  )
}

export default ButtonPerfil
