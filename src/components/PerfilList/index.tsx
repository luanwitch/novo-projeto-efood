import * as S from '../ProductList/styles'

import Perfil from '../ProductPerfil'

const PerfilList = ({
  perfils,
  restauranteId,
  onProductClick,
  botaoLabel
}: PerfilProps) => {
  // Encontra o restaurante específico
  const restaurante = perfils.find(
    (perfil) => perfil.id === Number(restauranteId)
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
          {restaurante.cardapio.map((item) => (
            <Perfil
              key={`${restaurante.id}-${item.id}`}
              restauranteId={restaurante.id}
              id={item.id}
              title={item.nome}
              image={item.foto}
              description={item.descricao}
              onClick={() => onProductClick(restaurante, item)}
              botaoLabel={botaoLabel} // 🔹 Passamos a label personalizada
            />
          ))}
        </S.List>
      </S.SectionContainer>
    )
  }

  // Lista de restaurantes
  return (
    <S.SectionContainer>
      <S.List>
        {perfils.map((perfil) => (
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
