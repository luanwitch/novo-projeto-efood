import { useParams } from 'react-router-dom'

import { useGetRestaurantsProductQuery } from '../../services/api' // Importe o hook da API

import PerfilList from '../../components/PerfilList'
import Loader from '../../components/Loader'

const Perfil = () => {
  const { id } = useParams()

  // Usando o hook do RTK Query para buscar todos os restaurantes
  const {
    data: restaurantes,
    isLoading,
    isError
  } = useGetRestaurantsProductQuery()

  const handleProductClick = () => {
    console.log('Produto clicado')
  }

  // Exibir loading ou erro
  if (isLoading) return <Loader />
  if (isError) return <p>Erro ao carregar os restaurantes.</p>

  return (
    <PerfilList
      perfils={restaurantes || []} // Passa a lista de restaurantes ou um array vazio
      restauranteId={Number(id)}
      onProductClick={handleProductClick}
    />
  )
}

export default Perfil
