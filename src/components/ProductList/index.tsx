import Product from '../Product'
import * as S from './styles'

export type Props = {
  produtos: Produto[]
}

const ProductsList = ({ produtos }: Props) => (
  <S.SectionContainer>
    <S.List>
      {produtos.map((produto) => (
        <Product key={produto.id} {...produto} />
      ))}
    </S.List>
  </S.SectionContainer>
)

export default ProductsList
