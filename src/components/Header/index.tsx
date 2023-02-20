import { Container, Content, PageDetails } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header(){
  return (
    <Container>
      <Content>
        <PageDetails>
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </PageDetails>

        <img src={logo} alt="WAITERAPP" />
      </Content>
    </Container>
  );
}
