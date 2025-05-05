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
import { usePurchaseMutation } from '../../services/api'

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

  const openCartDeliveryEnd = () => {
    dispatch(openDeliveryEnd())
  }

  const [purchase] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      end: '',
      city: '',
      cep: '',
      numero: '',
      complement: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('preenchimento obrigatório'),
      end: Yup.string().required('preenchimento obrigatório'),
      city: Yup.string().required('preenchimento obrigatório'),
      cep: Yup.string()
        .min(9, 'minimo 9 caracteres')
        .max(9, 'máximo 9 caracteres')
        .required('preenchimento obrigatório'),
      numero: Yup.string().required('preenchimento obrigatório')
    }),

    onSubmit: async (values) => {
      setIsLoading(true)
      dispatch(setDeliveryData(values))

      try {
        const response = await purchase({
          delivery: {
            receiver: values.fullName,
            address: {
              description: values.end,
              city: values.city,
              zipCode: values.cep.replace('-', ''),
              number: Number(values.numero),
              complement: values.complement || 'N/A'
            }
          },
          products: items.map((item) => ({
            id: item.id,
            price: item.preco
          })),
          payment: {
            card: {
              name: '',
              number: '',
              code: 0,
              expires: {
                month: 0,
                year: 0
              }
            }
          }
        }).unwrap()

        console.log('Resposta da API:', response)

        // Timer de 1 segundo antes de prosseguir
        setTimeout(() => {
          setIsLoading(false)
          openCartDeliveryEnd()
        }, 1000)
      } catch (error) {
        console.error('Erro na API:', error)
        setIsLoading(false)
      }
    }
  })

  // Função que verifica se um campo tem erro, considerando também a tentativa de submissão
  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError =
      (isTouched && isInvalid) || (form.submitCount > 0 && isInvalid)

    return hasError
  }

  // Função para lidar com o clique no botão de continuar
  const handleContinueClick = () => {
    // Marca todos os campos como tocados para exibir os erros
    const touchedFields = Object.keys(form.values).reduce((acc, field) => {
      acc[field] = true
      return acc
    }, {} as Record<string, boolean>)

    form.setTouched(touchedFields)

    // Valida o formulário manualmente
    form.validateForm().then((errors) => {
      // Se não houver erros, submete o formulário
      if (Object.keys(errors).length === 0) {
        form.handleSubmit()
      }
    })
  }

  // Efeito para mostrar o loader quando o delivery é aberto
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
    if (items.length === 0) {
      dispatch(close())
      dispatch(closeDelivery())
      navigate('/')
    }
  }, [items, dispatch, navigate])

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
                      onChange={(e) =>
                        form.setFieldValue('cep', e.target.value)
                      }
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
                    value={form.values.complement}
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
                    Voltar ao carrinho
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
