import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as S from './styles'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import { useGetRestaurantsProductQuery } from '../../services/api'
import logo from '../../assets/image/logo.png'
import { Container } from '../../styles'
import { Restaurante } from '../../types'

const HeaderKnow = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetRestaurantsProductQuery()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const openCart = () => {
    dispatch(open())
  }

  const produto = data
    ? data.find((item: Restaurante) => item.id === Number(id))
    : null

  return (
    <>
      <S.HeaderBarKnow>
        <Container>
          <S.Links>
            <S.LinksItem>
              <Link to="/">Restaurantes</Link>
            </S.LinksItem>
            <S.LinksItem>
              <S.LogoLearnMore
                src={logo}
                alt="EFOOD"
                onClick={() => navigate('/')}
              />
            </S.LinksItem>
            <S.LinksItem>
              <S.LinkCar onClick={openCart}>
                {items.length} produto(s) no carrinho
              </S.LinkCar>
            </S.LinksItem>
          </S.Links>
        </Container>
      </S.HeaderBarKnow>

      {isLoading && <h3>Carregando...</h3>}
      {error && <h3>Erro ao carregar dados</h3>}

      {produto && (
        <S.ImageBottomKnow style={{ backgroundImage: `url(${produto.capa})` }}>
          <S.TitleContainer>
            <S.TitleCategoryKnow>{produto.tipo}</S.TitleCategoryKnow>
            <S.TitleLearnMore>{produto.titulo}</S.TitleLearnMore>
          </S.TitleContainer>
        </S.ImageBottomKnow>
      )}
    </>
  )
}

export default HeaderKnow
