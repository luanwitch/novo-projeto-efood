import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import * as S from './styles'

import { RootReducer } from '../../store'
import { clearItems, closeFinalProject } from '../../store/reducers/cart'
import { usePurchaseMutation } from '../../services/api'

const ProjectFinal = () => {
  const { isFinalProjectOpen, deliveryData, products, paymentData, items } =
    useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const closeFinalProjectPage = () => {
    dispatch(closeFinalProject())
  }

  const [purchase, { isLoading, isError, data }] = usePurchaseMutation()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (data?.orderId) {
      setOrderId(data.orderId)
      setOrderPlaced(true)
      dispatch(clearItems()) // ✅ só limpa após sucesso
    }
  }, [data, dispatch])

  const handleSubmit = async () => {
    if (orderPlaced) {
      closeFinalProjectPage()
      return
    }

    if (!deliveryData || !paymentData) {
      console.error('Dados de entrega ou pagamento ausentes')
      return
    }

    // Formatação segura dos dados
    const formData = {
      delivery: {
        receiver: deliveryData.fullName,
        address: {
          description: deliveryData.end,
          city: deliveryData.city,
          zipCode: String(deliveryData.cep).replace(/\D/g, ''), // só números
          number: Number(deliveryData.numero),
          complement: deliveryData.complement || 'N/A'
        }
      },
      products:
        products.length > 0
          ? products.map((p: { id: any; price: any }) => ({
              id: p.id,
              price: Number(p.price)
            }))
          : items.map((item: { id: any; preco: any }) => ({
              id: item.id,
              price: Number(item.preco)
            })),
      payment: {
        ...paymentData,
        cardNumber: paymentData.cardNumber.replace(/\s/g, ''), // remove espaços
        expiryDate: (() => {
          // transforma MM/YY em YYYY-MM
          const [month, year] = paymentData.expiryDate.split('/')
          return `20${year}-${month.padStart(2, '0')}`
        })()
      }
    }

    try {
      const result = await purchase(formData).unwrap()
      if (result?.orderId) {
        setOrderId(result.orderId)
        setOrderPlaced(true)
      }
    } catch (error) {
      console.error('Erro ao processar o pedido:', error)
    }
  }

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao processar o pedido</div>

  return (
    <S.FaseEnd className={isFinalProjectOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeFinalProjectPage} />
      <S.Sidebar>
        <h3>
          Pedido realizado - <br />
          <br />
          <S.Content>{orderId || 'AGUARDANDO CONFIRMAÇÃO'}</S.Content>
          <br />
          <br />
          <S.Content>Ganhou frete grátis</S.Content>
        </h3>

        {deliveryData && (
          <div>
            <h4>Detalhes da Entrega:</h4>
            <ul>
              <li>
                <S.Completed>Nome do Recebedor:</S.Completed>{' '}
                <S.Content>{deliveryData.fullName}</S.Content>
              </li>
              <li>
                <S.Completed>Endereço:</S.Completed>{' '}
                <S.Content>{deliveryData.end}</S.Content>
              </li>
              <li>
                <S.Completed>Cidade:</S.Completed>{' '}
                <S.Content>{deliveryData.city}</S.Content>
              </li>
              <li>
                <S.Completed>CEP:</S.Completed>{' '}
                <S.Content>{deliveryData.cep}</S.Content>
              </li>
              <li>
                <S.Completed>Número:</S.Completed>{' '}
                <S.Content>{deliveryData.numero}</S.Content>
              </li>
              <li>
                <S.Completed>Complemento:</S.Completed>{' '}
                <S.Content>{deliveryData.complement || 'N/A'}</S.Content>
              </li>
            </ul>
          </div>
        )}

        <div>
          <S.TextEnd>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido.
          </S.TextEnd>
          <S.TextEnd>
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras.
          </S.TextEnd>
          <S.TextEnd>
            Lembre-se da importância de higienizar as mãos após o recebimento do
            pedido, garantindo assim sua segurança e bem-estar durante a
            refeição.
          </S.TextEnd>
          <S.TextEnd>
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </S.TextEnd>
        </div>

        <S.ButtonContainer>
          <div>
            <S.ButtonCart
              onClick={handleSubmit}
              title={orderPlaced ? 'Fechar' : 'Clique aqui para concluir'}
              type="button"
            >
              {orderPlaced
                ? 'Obrigado !! clique aqui para encerrar'
                : 'Concluir'}
            </S.ButtonCart>
          </div>
        </S.ButtonContainer>
      </S.Sidebar>
    </S.FaseEnd>
  )
}

export default ProjectFinal
