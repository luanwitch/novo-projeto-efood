import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import * as S from './styles'
import { PricesT } from '../Cart/styles'

import { RootReducer } from '../../store'
import {
  closeDeliveryEnd,
  openFinalProject,
  closeDelivery,
  close,
  setPaymentData
} from '../../store/reducers/cart'
import { CardapioItem } from '../../types'

const FinalDelivery = () => {
  const { isOpenDeliveryEnd, items } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()

  const closeCartDeliveryEnd = () => {
    dispatch(closeDeliveryEnd())
  }

  const form = useFormik({
    initialValues: {
      cardFullName: '',
      cardNumber: '',
      segNumber: '',
      vectoMonth: '',
      vectoYear: ''
    },
    validationSchema: Yup.object({
      cardFullName: Yup.string().required('Preenchimento obrigatório'),
      cardNumber: Yup.string()
        .test(
          'cardNumberComplete',
          'Número de cartão incompleto',
          (value) => !!value && value.replace(/[^0-9]/g, '').length === 16
        )
        .required('Preenchimento obrigatório'),
      segNumber: Yup.string()
        .test(
          'cvvComplete',
          'CVV incompleto',
          (value) => !!value && value.replace(/[^0-9]/g, '').length === 3
        )
        .required('Preenchimento obrigatório'),
      vectoMonth: Yup.string()
        .test(
          'monthComplete',
          'Mês incompleto',
          (value) => !!value && value.replace(/[^0-9]/g, '').length === 2
        )
        .test('validMonth', 'Mês inválido', (value) => {
          const month = parseInt(value || '0', 10)
          return month >= 1 && month <= 12
        })
        .required('Preenchimento obrigatório'),
      vectoYear: Yup.string()
        .test(
          'yearComplete',
          'Ano incompleto',
          (value) => !!value && value.replace(/[^0-9]/g, '').length === 4
        )
        .test('validYear', 'Ano inválido', (value) => {
          const year = parseInt(value || '0', 10)
          const currentYear = new Date().getFullYear()
          return year >= currentYear && year <= currentYear + 20
        })
        .required('Preenchimento obrigatório')
    }),
    onSubmit: (values) => {
      dispatch(
        setPaymentData({
          card: {
            name: values.cardFullName,
            number: values.cardNumber.replace(/\s/g, ''),
            code: Number(values.segNumber),
            expires: {
              month: Number(values.vectoMonth),
              year: Number(values.vectoYear)
            }
          }
        })
      )

      dispatch(openFinalProject())
      dispatch(closeDeliveryEnd())
      dispatch(closeDelivery())
      dispatch(close())
    }
  })

  const getErrorMessage = (fieldName: keyof typeof form.values): boolean => {
    const isTouched = form.touched[fieldName]
    const isInvalid = form.errors[fieldName]
    return (isTouched && !!isInvalid) || (form.submitCount > 0 && !!isInvalid)
  }

  const handleFinishPayment = () => {
    form.submitForm()
  }

  const getTotalPrice = () => {
    return items.reduce((total: number, item: CardapioItem) => {
      return total + item.preco
    }, 0)
  }

  return (
    <S.DeliContainer className={isOpenDeliveryEnd ? 'is-open' : ''}>
      <S.Overlay onClick={closeCartDeliveryEnd} />
      <S.Sidebar>
        <PricesT>
          Pagamento - Valor a pagar R${' '}
          {getTotalPrice().toLocaleString('pt-BR', {
            minimumFractionDigits: 2
          })}
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
                onClick={handleFinishPayment}
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
