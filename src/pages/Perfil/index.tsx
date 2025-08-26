import { useParams } from 'react-router-dom'
import { useGetRestaurantsProductQuery } from '../../services/api'

import { Restaurante, CardapioItem } from '../../types'

import PerfilList from '../../components/PerfilList'
import Loader from '../../components/Loader'

const Perfil = () => {
  const { id } = useParams()

  const {
    data: restaurantes,
    isLoading,
    isError
  } = useGetRestaurantsProductQuery()

  const handleProductClick = (restaurante: Restaurante, item: CardapioItem) => {
    console.log('Restaurante:', restaurante.titulo)
    console.log('Prato:', item.nome)
  }

  if (isLoading) return <Loader />
  if (isError) return <p>Erro ao carregar os restaurantes.</p>

  return (
    <PerfilList
      perfils={restaurantes || []}
      restauranteId={Number(id)}
      onProductClick={handleProductClick}
    />
  )
}

export default Perfil
