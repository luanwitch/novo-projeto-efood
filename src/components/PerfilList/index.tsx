import * as S from '../ProductList/styles'
import Perfil from '../ProductPerfil'

import { PerfilListProps, Restaurante, CardapioItem } from '../../types'

const PerfilList = ({
  perfils,
  restauranteId,
  onProductClick,
  botaoLabel
}: PerfilListProps) => {
  const restaurante = perfils.find(
    (perfil: Restaurante) => perfil.id === Number(restauranteId)
  )

  if (restauranteId && !restaurante) {
    return (
      <S.SectionContainer>
        <p>Restaurante não encontrado ou sem pratos disponíveis.</p>
      </S.SectionContainer>
    )
  }

  if (restauranteId && restaurante) {
    return (
      <S.SectionContainer>
        <S.List>
          {restaurante.cardapio.map((item: CardapioItem) => (
            <Perfil
              key={`${restaurante.id}-${item.id}`}
              restauranteId={restaurante.id}
              id={item.id}
              title={item.nome}
              image={item.foto}
              description={item.descricao}
              onClick={() => onProductClick(restaurante, item)}
              botaoLabel={botaoLabel}
            />
          ))}
        </S.List>
      </S.SectionContainer>
    )
  }

  return (
    <S.SectionContainer>
      <S.List>
        {perfils.map((perfil: Restaurante) => (
          <Perfil
            key={perfil.id}
            restauranteId={perfil.id}
            id={perfil.id}
            title={perfil.titulo}
            image={perfil.capa}
            description={perfil.descricao}
            onClick={() => onProductClick(perfil, perfil.cardapio[0])}
          />
        ))}
      </S.List>
    </S.SectionContainer>
  )
}

export default PerfilList
