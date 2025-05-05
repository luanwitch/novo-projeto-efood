import * as S from './styles'

import logo from '../../assets/image/logo.png'

const Header = () => (
  <S.HeaderBar>
    <S.LogoImage src={logo} alt="e-food" />
    <S.HeaderTitle>
      Viva experiências gastronômicas <br></br>no conforto da sua casa
    </S.HeaderTitle>
  </S.HeaderBar>
)

export default Header
