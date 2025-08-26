/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

import * as S from './styles'
import { colors } from '../../styles'

import { RootReducer } from '../../store'
import {
  closeDelivery,
  openDeliveryEnd,
  setDeliveryData,
  close
} from '../../store/reducers/cart'

import { DeliveryData } from '../../types'

const Delivery = () => {
  const { isOpenDelivery, items } = useSelector(
    (state: RootReducer) => state.cart
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const closeCartDelivery = () => {
    dispatch(closeDelivery())
  }

  const form = useFormik<DeliveryData>({
    initialValues: {
      fullName: '',
      end: '',
      city: '',
      cep: '',
      numero: '',
      complement: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Preenchimento obrigatório'),
      end: Yup.string().required('Preenchimento obrigatório'),
      city: Yup.string().required('Preenchimento obrigatório'),
      cep: Yup.string()
        .min(9, 'Mínimo 9 caracteres')
        .max(9, 'Máximo 9 caracteres')
        .required('Preenchimento obrigatório'),
      numero: Yup.string().required('Preenchimento obrigatório'),
      complement: Yup.string()
    }),
    onSubmit: (values) => {
      setIsLoading(true)
      dispatch(setDeliveryData(values))
      setTimeout(() => {
        setIsLoading(false)
        dispatch(openDeliveryEnd())
        dispatch(closeDelivery()) // ✅ CORREÇÃO: Fecha a tela atual para abrir a próxima
      }, 1000)
    }
  })

  const checkInputHasError = (fieldName: keyof DeliveryData) => {
    const isTouched = form.touched[fieldName]
    const isInvalid = form.errors[fieldName]
    return (isTouched && !!isInvalid) || (form.submitCount > 0 && !!isInvalid)
  }

  const handleContinueClick = () => {
    form.submitForm()
  }

  useEffect(() => {
    if (isOpenDelivery) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpenDelivery])

  useEffect(() => {
    if (items.length === 0 && isOpenDelivery) {
      dispatch(close())
      dispatch(closeDelivery())
      navigate('/')
    }
  }, [items, dispatch, navigate, isOpenDelivery])

  return (
    <S.DeliContainer className={isOpenDelivery ? 'is-open' : ''}>
      <S.Overlay onClick={closeCartDelivery} />
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
        ) : (
          <>
            <h3>Entrega</h3>
            <form onSubmit={form.handleSubmit}>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="fullName">Quem irá receber</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('fullName') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="end">Endereço</label>
                  <input
                    id="end"
                    type="text"
                    name="end"
                    value={form.values.end}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('end') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="city">Cidade</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={form.values.city}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('city') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.NuCepContainer>
                  <S.InputGroup>
                    <label htmlFor="cep">CEP</label>
                    <InputMask
                      id="cep"
                      type="text"
                      name="cep"
                      mask="99999-999"
                      maskChar={null}
                      value={form.values.cep}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('cep') ? 'error' : ''}
                      placeholder="00000-000"
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label htmlFor="numero">Número</label>
                    <input
                      id="numero"
                      type="text"
                      name="numero"
                      value={form.values.numero}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={checkInputHasError('numero') ? 'error' : ''}
                    />
                  </S.InputGroup>
                </S.NuCepContainer>
                <S.InputGroup>
                  <label htmlFor="complement">Complemento (opcional)</label>
                  <input
                    id="complement"
                    type="text"
                    name="complement"
                    value={form.values.complement || ''}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                </S.InputGroup>
              </S.Row>
              <S.ButtonContainer>
                <div>
                  <S.ButtonCart
                    onClick={handleContinueClick}
                    title="Clique aqui para continuar com o pagamento"
                    type="button"
                  >
                    Continuar com o pagamento
                  </S.ButtonCart>
                </div>
                <div>
                  <S.ButtonCart
                    onClick={closeCartDelivery}
                    title="Clique aqui para voltar ao carrinho"
                    type="button"
                  >
                    Voltar para o carrinho
                  </S.ButtonCart>
                </div>
              </S.ButtonContainer>
            </form>
          </>
        )}
      </S.Sidebar>
    </S.DeliContainer>
  )
}

export default Delivery
