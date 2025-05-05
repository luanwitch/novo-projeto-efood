import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'

import ScrollToTop from './components/ScrollToTop'
import Main from './components/Main'

import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <ScrollToTop />
        <Main /> {/* Use o componente Main aqui */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
