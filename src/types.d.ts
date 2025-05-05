declare type Produto = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: {
    foto: string
    preco: number
    id: number
    nome: string
    descricao: string
    porcao: string
  }[]
}

// Tipo para os produtos enviados à API
declare type ProductAPI = {
  id: number
  price: number
}
// Tipo para os dados de pagamento
declare type PaymentData = {
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

// Tipo para os dados de entrega
declare type DeliveryData = {
  fullName: string
  end: string
  city: string
  cep: string
  numero: string
  complement: string
} | null

// Estado do carrinho
declare type CartState = {
  items: Produto['cardapio'][0][] // Itens do carrinho (pratos)
  isOpen: boolean
  isOpenDelivery: boolean
  isOpenDeliveryEnd: boolean
  isFinalProjectOpen: boolean
  deliveryData: DeliveryData
  products: ProductAPI[]
  paymentData: PaymentData
}

declare type Product = {
  id: number
  price: number
}

declare type PurchasePayload = {
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

declare type Purchaseresponse = {
  delivery: null
  orderId: string
}

declare type InputGroupProps = {
  maxWidth?: string
}

declare type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children: React.ReactNode
}

// Definindo tipos para o formulário
declare interface FormValues {
  cardFullName: string
  cardNumber: string
  segNumber: string
  vectoMonth: string
  vectoYear: string
  [key: string]: string // Índice de assinatura para permitir acesso dinâmico aos campos
}

declare type PerfilProps = {
  perfils: Produto[]
  restauranteId?: number
  onProductClick: (restaurante: Produto, item: Produto['cardapio'][0]) => void
  botaoLabel?: string // 🔹 Adicionamos a propriedade opcional
}
