import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import * as S from './styles'

import { RootReducer } from '../../store'
import { clearItems, closeFinalProject } from '../../store/reducers/cart'
import { usePurchaseMutation } from '../../services/api'

import { PurchasePayload, CardapioItem } from '../../types'

const ProjectFinal = () => {
  const { isFinalProjectOpen, deliveryData, paymentData, items } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const [purchase, { isError, data }] = usePurchaseMutation()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data?.orderId) {
      setOrderId(data.orderId)
      setOrderPlaced(true)
      dispatch(clearItems())
    }
  }, [data, dispatch])

  const closeFinalProjectPage = () => {
    if (orderPlaced) {
      dispatch(clearItems())
    }
    dispatch(closeFinalProject())
  }

  const handleSubmit = async () => {
    if (!deliveryData || !paymentData) {
      console.error('Dados de entrega ou pagamento ausentes')
      return
    }

    try {
      setIsLoading(true)

      const products: { id: number; price: number }[] = items.map(
        (item: CardapioItem) => ({
          id: item.id,
          price: item.preco
        })
      )

      const purchasePayload: PurchasePayload = {
        products,
        delivery: {
          receiver: deliveryData.fullName,
          address: {
            description: deliveryData.end,
            city: deliveryData.city,
            zipCode: deliveryData.cep,
            number: Number(deliveryData.numero),
            complement: deliveryData.complement
          }
        },
        payment: paymentData
      }

      const result = await purchase(purchasePayload).unwrap()

      if (result.orderId) {
        setOrderId(result.orderId)
        setOrderPlaced(true)
      }
    } catch (error) {
      console.error('Erro ao processar o pedido:', error)
      alert('Ocorreu um erro ao finalizar a compra. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.FaseEnd className={isFinalProjectOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeFinalProjectPage} />
      <S.Sidebar>
        {isLoading ? (
          <div>Carregando...</div>
        ) : isError ? (
          <div>Erro ao processar o pedido. Tente novamente.</div>
        ) : orderPlaced ? (
          <>
            <h3>Pedido realizado com sucesso!</h3>
            <S.TextEnd>
              O número do seu pedido é: <S.Content>{orderId}</S.Content>
            </S.TextEnd>
            <br />
            <S.TextEnd>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </S.TextEnd>
            <S.ButtonContainer>
              <S.ButtonCart
                onClick={closeFinalProjectPage}
                title="Concluir"
                type="button"
              >
                Concluir
              </S.ButtonCart>
            </S.ButtonContainer>
          </>
        ) : (
          <>
            <h3>Finalizar Compra</h3>
            <S.ButtonContainer>
              <S.ButtonCart
                onClick={handleSubmit}
                title="Clique aqui para concluir o pedido"
                type="button"
              >
                Finalizar Pagamento
              </S.ButtonCart>
            </S.ButtonContainer>
          </>
        )}
      </S.Sidebar>
    </S.FaseEnd>
  )
}

export default ProjectFinal
