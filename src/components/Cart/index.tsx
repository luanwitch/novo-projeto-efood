import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'

import * as S from './styles'

import { colors } from '../../styles'
import { RootReducer } from '../../store'
import { close, remove, openDelivery } from '../../store/reducers/cart'
import { CardapioItem } from '../../types'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const cartDelivery = () => {
    dispatch(openDelivery())
    dispatch(close())
  }

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const getTotalPrice = () => {
    return items.reduce((total: number, item: CardapioItem) => {
      return total + item.preco
    }, 0)
  }

  return (
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeCart} />
      <S.Sidebar>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <PacmanLoader color={colors.lightRed} />
          </div>
        ) : items.length > 0 ? (
          <>
            <ul>
              {items.map((item: CardapioItem) => (
                <S.CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <S.Prices>
                      R${' '}
                      {item.preco.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2
                      })}
                    </S.Prices>
                  </div>
                  <div>
                    <S.ButtonClose
                      onClick={() => removeItem(item.id)}
                      type="button"
                    />
                  </div>
                </S.CartItem>
              ))}
            </ul>
            <S.Quantity>{items.length} item(s) no carrinho</S.Quantity>
            <S.AlinPrices>
              <S.PricesT>Valor total</S.PricesT>
              <S.PricesT>
                R${' '}
                {getTotalPrice().toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </S.PricesT>
            </S.AlinPrices>
            <S.ButtonContainer>
              <div>
                <S.ButtonCart
                  onClick={cartDelivery}
                  title="Clique aqui para continuar com a entrega"
                  type="button"
                >
                  Continuar com a entrega
                </S.ButtonCart>
              </div>
            </S.ButtonContainer>
          </>
        ) : (
          <p className="empty-text">
            O carrinho está vazio, adicione pelo menos um item para continuar
            com a compra.
          </p>
        )}
      </S.Sidebar>
    </S.CartContainer>
  )
}

export default Cart
