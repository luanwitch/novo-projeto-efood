import { useSelector } from 'react-redux'

import { RootReducer } from '../../store'
import Rotas from '../../routes'

import Cart from '../../components/Cart'
import Delivery from '../../components/Delivery'
import FinalDelivery from '../../components/FinalDelivery'
import ProjectFinal from '../../components/ProjectFinal'

const Main = () => {
  const { isOpenDelivery, isOpenDeliveryEnd, isFinalProjectOpen } = useSelector(
    (state: RootReducer) => state.cart
  )

  return (
    <>
      <Rotas />
      <Cart />
      {isOpenDelivery && <Delivery />}
      {isOpenDeliveryEnd && <FinalDelivery />}
      {isFinalProjectOpen && <ProjectFinal />}
    </>
  )
}

export default Main
