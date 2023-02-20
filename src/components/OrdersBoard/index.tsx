import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Container, Content } from './styles';

interface OrdersBoardProps {
  icon: string,
  title: string,
  orders: Array<Order>,
}

export default function OrdersBoard({ icon, title, orders }: OrdersBoardProps){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModa(){
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderModal visible={isModalVisible} order={selectedOrder} onClose={handleCloseModa}/>
      <Container>
        <header>
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </header>

        {orders.length > 0 && (
          <Content>
            {orders.map((order) => (
              <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
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
