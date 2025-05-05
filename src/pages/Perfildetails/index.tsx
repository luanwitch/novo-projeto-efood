import { useEffect, useState, memo, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import PerfilList from '../../components/PerfilList'
import Loader from '../../components/Loader'
import fechar_modal from '../../assets/image/fechar-modal.png'
import { useGetRestaurantByIdQuery } from '../../services/api'
import { add, open } from '../../store/reducers/cart'

const MemoizedPerfilList = memo(PerfilList)

const PerfilDetails = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const pratoId = searchParams.get('prato')
  const restauranteId = id ? Number(id) : 0
  const { data: restaurante } = useGetRestaurantByIdQuery(restauranteId, {
    skip: !restauranteId
  })
  const [selectedDish, setSelectedDish] = useState<
    Produto['cardapio'][0] | null
  >(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const dispatch = useDispatch()
  const cardsRef = useRef<HTMLDivElement>(null)
  const [modalTop, setModalTop] = useState(0)

  useEffect(() => {
    if (restaurante && pratoId) {
      const pratoSelecionado = restaurante.cardapio.find(
        (p) => p.id === Number(pratoId)
      )
      if (pratoSelecionado) {
        setSelectedDish(pratoSelecionado)
        setModalIsOpen(true)
      }
    }
  }, [restaurante, pratoId])

  useEffect(() => {
    if (modalIsOpen) {
      // Define o modal no topo da janela visível
      setModalTop(100)
    }
  }, [modalIsOpen])

  const handleProductClick = (item: Produto['cardapio'][0]) => {
    setSelectedDish(item)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedDish(null)
  }

  const handleAddToCart = () => {
    if (selectedDish) {
      dispatch(add(selectedDish))
      dispatch(open())
      closeModal()
    }
  }

  if (!restaurante) {
    return <Loader />
  }

  return (
    <>
      <div ref={cardsRef}>
        <MemoizedPerfilList
          perfils={[restaurante]}
          restauranteId={restauranteId}
          onProductClick={(_, item) => handleProductClick(item)}
          botaoLabel="Mais detalhes"
        />
      </div>

      {modalIsOpen && selectedDish && (
        <>
          <S.Overlay className="visivel" onClick={closeModal} />
          <S.Modal style={{ top: `${modalTop}px` }}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <header>
                <img
                  src={fechar_modal}
                  alt="Ícone fechar"
                  onClick={closeModal}
                />
              </header>
              <img src={selectedDish.foto} alt={selectedDish.nome} />
              <div>
                <h4>{selectedDish.nome}</h4>
                <p>{selectedDish.descricao}</p>
                <p>Porção: {selectedDish.porcao}</p>
                <button
                  title={`Adicionar ao carrinho - ${selectedDish.nome}`}
                  onClick={handleAddToCart}
                >
                  Adicionar ao carrinho - R$ {selectedDish.preco.toFixed(2)}
                </button>
              </div>
            </S.ModalContent>
          </S.Modal>
        </>
      )}
    </>
  )
}

export default PerfilDetails
