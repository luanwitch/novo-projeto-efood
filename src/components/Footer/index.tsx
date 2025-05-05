import * as S from './styles'
import { Container } from '../../styles'
import { LogoImage } from '../Header/styles'

import logo from '../../assets/image/logo.png'
import insta from '../../assets/image/instagram-round-svgrepo-com.png'
import face from '../../assets/image/facebook.png'
import x from '../../assets/image/x.png'

const Footer = () => (
  <S.FooterBottom>
    <div>
      <S.FooterLogo>
        <LogoImage src={logo} alt="logo" />
      </S.FooterLogo>

      <div>
        <S.SocialNetworks>
          <li>
            <img src={insta} alt="instagram" />
          </li>
          <li>
            <img src={face} alt="facebook" />
          </li>
          <li>
            <img src={x} alt="x" />
          </li>
        </S.SocialNetworks>
        <Container>
          <S.DescriptionFooter>
            A efood é uma plataforma para divulgação de estabelecimentos, a
            responsabilidade pela entrega, qualidade <br /> dos produtos é toda
            do estabelecimento contratado.
          </S.DescriptionFooter>
        </Container>
      </div>
    </div>
  </S.FooterBottom>
)

export default Footer
