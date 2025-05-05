import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import InputMask from 'react-input-mask'

import * as S from './styles'
import { PricesT } from '../Cart/styles'

import { RootReducer } from '../../store'
import {
  closeDeliveryEnd,
  openFinalProject,
  closeDelivery,
  close,
  clearItems
} from '../../store/reducers/cart'
import { usePurchaseMutation } from '../../services/api'

const FinalDelivery = () => {
  const { isOpenDeliveryEnd, items } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const [purchase, { data }] = usePurchaseMutation()

  // Monitorar a resposta da API de compra
  useEffect(() => {
    if (data) {
      console.log('Compra realizada com sucesso:', data)
      // Limpar os itens do carrinho após compra bem-sucedida
      dispatch(clearItems())
    }
  }, [data, dispatch])

  // Monitorar quando o carrinho fica vazio para abrir o ProjectFinal
  useEffect(() => {
    if (items.length === 0) {
      dispatch(close()) // Fecha o Cart
      dispatch(closeDelivery()) // Fecha o Delivery
      dispatch(closeDeliveryEnd()) // Fecha o FinalDelivery
      dispatch(openFinalProject()) // Abre o ProjectFinal
    }
  }, [items, dispatch])

  const closeCartDeliveryEnd = () => {
    dispatch(closeDeliveryEnd()) // Fecha o FinalDelivery
  }

  const form = useFormik<FormValues>({
    initialValues: {
      cardFullName: '',
      cardNumber: '',
      segNumber: '',
      vectoMonth: '',
      vectoYear: ''
    },
    validationSchema: Yup.object({
      cardFullName: Yup.string().required('preenchimento obrigatório'),
      cardNumber: Yup.string()
        .test(
          'cardNumberComplete',
          'Número de cartão incompleto',
          (value) => value?.replace(/[^0-9]/g, '').length === 16
        )
        .required('preenchimento obrigatório'),
      segNumber: Yup.string()
        .test(
          'cvvComplete',
          'CVV incompleto',
          (value) => value?.replace(/[^0-9]/g, '').length === 3
        )
        .required('preenchimento obrigatório'),
      vectoMonth: Yup.string()
        .test(
          'monthComplete',
          'Mês incompleto',
          (value) => value?.replace(/[^0-9]/g, '').length === 2
        )
        .test('validMonth', 'Mês inválido', (value) => {
          const month = parseInt(value || '0')
          return month >= 1 && month <= 12
        })
        .required('preenchimento obrigatório'),
      vectoYear: Yup.string()
        .test(
          'yearComplete',
          'Ano incompleto',
          (value) => value?.replace(/[^0-9]/g, '').length === 4
        )
        .test('validYear', 'Ano inválido', (value) => {
          const year = parseInt(value || '0')
          const currentYear = new Date().getFullYear()
          return year >= currentYear && year <= currentYear + 20
        })
        .required('preenchimento obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        // Obtém os valores do pagamento
        const payment = {
          card: {
            name: values.cardFullName,
            number: values.cardNumber.replace(/\s/g, ''), // Remove espaços
            code: Number(values.segNumber),
            expires: {
              month: Number(values.vectoMonth),
              year: Number(values.vectoYear)
            }
          }
        }

        // Obtém os valores de entrega
        const delivery = {
          receiver: '', // Exemplo, você precisa pegar os valores do formulário anterior
          address: {
            description: '',
            city: '',
            zipCode: '',
            number: 0,
            complement: ''
          }
        }

        // Chama a API para realizar a compra
        const response = await purchase({
          products: items.map((item) => ({
            id: item.id,
            price: item.preco
          })),
          delivery,
          payment
        }).unwrap()

        console.log('Resposta da API:', response) // Verifique a resposta da API
      } catch (error) {
        console.error('Erro na API:', error) // Verifique o erro
      }
    }
  })

  const getErrorMessage = (fieldName: string): boolean => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError =
      (isTouched && isInvalid) || (form.submitCount > 0 && isInvalid)

    // Verifica se o campo foi submetido e está incompleto
    if (form.submitCount > 0) {
      if (
        fieldName === 'cardNumber' &&
        form.values.cardNumber.replace(/[^0-9]/g, '').length < 16
      ) {
        return true
      }
      if (
        fieldName === 'segNumber' &&
        form.values.segNumber.replace(/[^0-9]/g, '').length < 3
      ) {
        return true
      }
      if (
        fieldName === 'vectoMonth' &&
        form.values.vectoMonth.replace(/[^0-9]/g, '').length < 2
      ) {
        return true
      }
      if (
        fieldName === 'vectoYear' &&
        form.values.vectoYear.replace(/[^0-9]/g, '').length < 4
      ) {
        return true
      }
    }

    return hasError
  }

  // Função para abrir a página final do projeto
  const openFinalProjectPage = () => {
    // Marca todos os campos como tocados para exibir os erros
    const touchedFields = Object.keys(form.values).reduce<
      Record<string, boolean>
    >((acc, field) => {
      acc[field] = true
      return acc
    }, {})

    form.setTouched(touchedFields)

    // Verifica se os campos com máscara estão preenchidos completamente
    const cardNumberComplete =
      form.values.cardNumber.replace(/[^0-9]/g, '').length === 16
    const cvvComplete =
      form.values.segNumber.replace(/[^0-9]/g, '').length === 3
    const monthComplete =
      form.values.vectoMonth.replace(/[^0-9]/g, '').length === 2
    const yearComplete =
      form.values.vectoYear.replace(/[^0-9]/g, '').length === 4

    // Valida o formulário manualmente
    form.validateForm().then((validationErrors) => {
      // Cria uma cópia dos erros de validação
      const allErrors = { ...validationErrors }

      // Adiciona erros para campos incompletos
      if (!cardNumberComplete)
        allErrors.cardNumber = 'Número de cartão incompleto'
      if (!cvvComplete) allErrors.segNumber = 'CVV incompleto'
      if (!monthComplete) allErrors.vectoMonth = 'Mês incompleto'
      if (!yearComplete) allErrors.vectoYear = 'Ano incompleto'

      // Define todos os erros de uma vez
      form.setErrors(allErrors)

      // Se não houver erros, submete o formulário e abre o ProjectFinal
      if (Object.keys(allErrors).length === 0) {
        form.handleSubmit()

        dispatch(openFinalProject())
        dispatch(closeDeliveryEnd())
        dispatch(closeDelivery())
        dispatch(close())
      }
    })
  }

  return (
    <S.DeliContainer className={isOpenDeliveryEnd ? 'is-open' : ''}>
      <S.Overlay onClick={closeCartDeliveryEnd} />
      <S.Sidebar>
        <PricesT>
          Pagamento - Valor a pagar R${' '}
          {items
            .reduce((total, item) => total + item.preco, 0)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </PricesT>
        <form onSubmit={form.handleSubmit}>
          <S.Row>
            <S.InputGroup maxWidth="326px">
              <label htmlFor="cardFullName">Nome no cartão</label>
              <input
                id="cardFullName"
                type="text"
                name="cardFullName"
                value={form.values.cardFullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={getErrorMessage('cardFullName') ? 'error' : ''}
              />
            </S.InputGroup>

            <S.CartContainer>
              <S.InputGroup maxWidth="228px">
                <label htmlFor="cardNumber">Número do cartão</label>
                <InputMask
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={form.values.cardNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('cardNumber') ? 'error' : ''}
                  mask="9999 9999 9999 9999"
                  maskChar={null}
                  placeholder="0000 0000 0000 0000"
                />
              </S.InputGroup>

              <S.InputGroup maxWidth="88px">
                <label htmlFor="segNumber">CVV</label>
                <InputMask
                  id="segNumber"
                  type="text"
                  name="segNumber"
                  value={form.values.segNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('segNumber') ? 'error' : ''}
                  mask="999"
                  maskChar={null}
                  placeholder="CVV"
                />
              </S.InputGroup>
            </S.CartContainer>

            <S.CartContainer>
              <S.InputGroup maxWidth="155px">
                <label htmlFor="vectoMonth">Mês de vencimento</label>
                <InputMask
                  id="vectoMonth"
                  type="text"
                  name="vectoMonth"
                  value={form.values.vectoMonth}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('vectoMonth') ? 'error' : ''}
                  mask="99"
                  maskChar={null}
                  placeholder="MM"
                />
              </S.InputGroup>

              <S.InputGroup maxWidth="155px">
                <label htmlFor="vectoYear">Ano de vencimento</label>
                <InputMask
                  id="vectoYear"
                  type="text"
                  name="vectoYear"
                  value={form.values.vectoYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('vectoYear') ? 'error' : ''}
                  mask="9999"
                  maskChar={null}
                  placeholder="AAAA"
                />
              </S.InputGroup>
            </S.CartContainer>
          </S.Row>

          <S.ButtonContainer>
            <div>
              <S.ButtonCart
                onClick={openFinalProjectPage} // Chama a função de envio
                title="Clique aqui para finalizar o pagamento"
                type="button"
              >
                Finalizar pagamento
              </S.ButtonCart>
            </div>
            <div>
              <S.ButtonCart
                onClick={closeCartDeliveryEnd}
                title="Clique aqui para voltar para a edição de endereço"
                type="button"
              >
                Voltar para a edição de endereço
              </S.ButtonCart>
            </div>
          </S.ButtonContainer>
        </form>
      </S.Sidebar>
    </S.DeliContainer>
  )
}

export default FinalDelivery
