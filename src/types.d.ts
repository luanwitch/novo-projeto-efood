// Produto do cardápio
export type Produto = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: {
    id: number
    nome: string
    descricao: string
    foto: string
    preco: number
    porcao: string
  }[]
}

// Tipo usado para enviar produtos à API
export type ProductAPI = {
  id: number
  price: number
}

// Dados de pagamento
export type PaymentData = {
  cardNumber: string
  expiryDate: string // MM/YY
  cvv: string
  nameOnCard: string
}

// Dados de entrega
export type DeliveryData = {
  fullName: string
  end: string
  city: string
  cep: string
  numero: string
  complement: string
} | null

// Estado do carrinho
export type CartState = {
  items: Produto['cardapio'][0][] // Itens do carrinho (pratos)
  isOpen: boolean
  isOpenDelivery: boolean
  isOpenDeliveryEnd: boolean
  isFinalProjectOpen: boolean
  deliveryData: DeliveryData
  products: ProductAPI[]
  paymentData: PaymentData
}

// Tipo genérico de produto para API
export type Product = {
  id: number
  price: number
}

// Payload da requisição de compra
export type PurchasePayload = {
  orderId?: string
  products: Product[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement: string
    }
  }
  payment: {
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
}

// Resposta da API
export type PurchaseResponse = {
  delivery: null
  orderId: string
}

// Props para InputGroup
export type InputGroupProps = {
  maxWidth?: string
}

// Props de botão ou link
export type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: React.ReactNode
}

// Formulário de pagamento
export interface FormValues {
  cardFullName: string
  cardNumber: string
  segNumber: string
  vectoMonth: string
  vectoYear: string
  [key: string]: string // permite acesso dinâmico
}

// Props de perfil/restaurante
export type PerfilProps = {
  perfils: Produto[]
  restauranteId?: number
  onProductClick: (restaurante: Produto, item: Produto['cardapio'][0]) => void
  botaoLabel?: string // opcional
}
