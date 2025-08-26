export type CardapioItem = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

export type Restaurante = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: CardapioItem[]
}

export type DeliveryData = {
  fullName: string
  end: string
  city: string
  cep: string
  numero: string
  complement?: string
}

export type PaymentData = {
  card: {
    name: string
    number: string
    code: number
    expires: {
      month: number
      year: number
    }
  }
}

export type CartState = {
  items: CardapioItem[]
  isOpen: boolean
  isOpenDelivery: boolean
  isOpenDeliveryEnd: boolean
  isFinalProjectOpen: boolean
  deliveryData: DeliveryData | null
  paymentData: PaymentData | null
}

export type ProductAPI = {
  id: number
  price: number
}

export type PurchasePayload = {
  products: ProductAPI[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement?: string
    }
  }
  payment: PaymentData
}

export type PurchaseResponse = {
  orderId: string
}

export type PerfilListProps = {
  perfils: Restaurante[]
  restauranteId?: number
  onProductClick: (restaurante: Restaurante, item: CardapioItem) => void
  botaoLabel?: string
}

export type InputGroupProps = {
  maxWidth?: string
}

export type ButtonProps = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: React.ReactNode
}

// Props para o componente Tag
export type TagProps = {
  children: string
}

export type Produto = Restaurante
