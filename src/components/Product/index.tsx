import * as S from './styles'

import Tag from '../Tag'
import Button from '../Button'

import Estrela from '../../assets/image/estrela.png'

const Product = ({
  id,
  titulo,
  destacado,
  tipo,
  avaliacao,
  descricao,
  capa
}: Produto) => (
  <S.Card>
    <S.ImageContainer>
      <img src={capa} alt={titulo} />
    </S.ImageContainer>
    <S.Category>
      {/* Renderiza a tag apenas se destacado for true */}
      {destacado && <Tag>Destaque da semana</Tag>}
      <Tag>{tipo}</Tag>
    </S.Category>
    <S.OnLine>
      <S.Title>{titulo}</S.Title>
      <S.Score>{avaliacao}</S.Score>
      <S.Star src={Estrela} alt="estrela" />
    </S.OnLine>
    <S.Description>{descricao}</S.Description>
    <Button
      type="link"
      to={`/Perfil/${id}`}
      title="Clique aqui para saber mais sobre os produtos"
    >
      Saiba mais
    </Button>
  </S.Card>
)

export default Product
