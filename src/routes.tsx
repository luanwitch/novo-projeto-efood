import { Routes, Route } from 'react-router-dom'

import { Container } from './styles'

import Home from './pages/Home'
import Perfil from './pages/Perfil'
import PerfilDetails from './pages/Perfildetails'

import Footer from './components/Footer'
import Header from './components/Header'
import HeaderKnow from './components/HeaderSaiba'

const Rotas = () => (
  <Routes>
    <Route
      path="/"
      element={
        <>
          <Header />
          <Container>
            <Home />
          </Container>
          <Footer />
        </>
      }
    />
    <Route
      path="/Perfil/:id"
      element={
        <>
          <HeaderKnow />
          <Container>
            <Perfil />
          </Container>
          <Footer />
        </>
      }
    />

    <Route
      path="/PerfilDetails/:id"
      element={
        <>
          <HeaderKnow />
          <Container>
            <PerfilDetails />
          </Container>
          <Footer />
        </>
      }
    />
  </Routes>
)

export default Rotas
