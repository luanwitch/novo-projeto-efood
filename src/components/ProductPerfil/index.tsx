import { useNavigate } from 'react-router-dom'

import * as S from './styles'

import ButtonPerfil from '../ButtonPerfil'

type Props = {
  restauranteId: number
  id: number
  title: string
  description: string
  image: string
  onClick?: () => void
  botaoLabel?: string
}

const ProductPerfil = ({
  restauranteId,
  id,
  title,
  description,
  image,
  onClick,
  botaoLabel
}: Props) => {
  const navigate = useNavigate()

  const handleAddToCart = () => {
    // Navega para a página de detalhes do restaurante com o ID do prato como parâmetro
    navigate(`/PerfilDetails/${restauranteId}?prato=${id}`)
    if (onClick) {
      onClick()
    }
  }

  return (
    <S.Card title={`Clique no botão para mais detalhes - ${title}`}>
      <div>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <S.OnLine>
        <S.Title>{title}</S.Title>
      </S.OnLine>
      <S.Description>{description}</S.Description>
      <div style={{ padding: '10px' }}>
        <ButtonPerfil
          title={botaoLabel || `Adicionar ao carrinho - ${title}`}
          onClick={handleAddToCart}
        >
          {botaoLabel || 'Adicionar ao carrinho'}
        </ButtonPerfil>
      </div>
    </S.Card>
  )
}

export default ProductPerfil
