import { Order } from '../../types/Order';
import { Container, Content } from './styles';

interface OrdersBoardProps {
  icon: string,
  title: string,
  orders: Array<Order>,
}

export default function OrdersBoard({ icon, title, orders }: OrdersBoardProps){
  return (
    <>
      <Container>
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </header>

        {orders.length > 0 && (
          <Content>
            {orders.map((order) => (
              <button type='button' key={order._id}>
                <strong>Mesa {order.table}</strong>
                <span>{order.products.length} itens</span>
              </button>
            ))}
          </Content>
        )}
      </Container>
    </>
  );
}
