import { useGetRestaurantsProductQuery } from '../../services/api'

import Loader from '../../components/Loader'
import ProductsList from '../../components/ProductList'

const Home = () => {
  const {
    data: cardapio = [],
    isLoading,
    error
  } = useGetRestaurantsProductQuery()

  if (isLoading) return <Loader />

  if (error) return <p>Erro ao carregar os restaurantes.</p>

  return <ProductsList produtos={cardapio} />
}

export default Home
