/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CardapioItem,
  CartState,
  DeliveryData,
  PaymentData,
  ProductAPI
} from '../../types'

const initialState: CartState = {
  items: [],
  isOpen: false,
  isOpenDelivery: false,
  isOpenDeliveryEnd: false,
  isFinalProjectOpen: false,
  deliveryData: null,
  paymentData: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CardapioItem>) => {
      const prato = action.payload
      const pratoJaExiste = state.items.find((item) => item.id === prato.id)

      if (!pratoJaExiste) {
        state.items.push(prato)
      } else {
        alert('Este prato já está no carrinho.')
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    openDelivery: (state) => {
      state.isOpenDelivery = true
    },
    closeDelivery: (state) => {
      state.isOpenDelivery = false
    },
    openDeliveryEnd: (state) => {
      state.isOpenDeliveryEnd = true
    },
    closeDeliveryEnd: (state) => {
      state.isOpenDeliveryEnd = false
    },
    openFinalProject: (state) => {
      state.isFinalProjectOpen = true
    },
    closeFinalProject: (state) => {
      state.isFinalProjectOpen = false
    },
    setDeliveryData: (state, action: PayloadAction<DeliveryData>) => {
      state.deliveryData = action.payload
    },
    setPaymentData: (state, action: PayloadAction<PaymentData>) => {
      state.paymentData = action.payload
    },
    clearItems: (state) => {
      state.items = []
    }
  }
})

export const {
  add,
  open,
  close,
  remove,
  openDelivery,
  closeDelivery,
  openDeliveryEnd,
  closeDeliveryEnd,
  openFinalProject,
  closeFinalProject,
  setDeliveryData,
  setPaymentData,
  clearItems
} = cartSlice.actions

export default cartSlice.reducer
