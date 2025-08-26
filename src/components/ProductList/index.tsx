import Product from '../Product'
import * as S from './styles'

import { Produto } from '../../types'

export type ProductsListProps = {
  produtos: Produto[]
}

const ProductsList = ({ produtos }: ProductsListProps) => (
  <S.SectionContainer>
    <S.List>
      {produtos.map((produto) => (
        <Product key={produto.id} {...produto} />
      ))}
    </S.List>
  </S.SectionContainer>
)

export default ProductsList
