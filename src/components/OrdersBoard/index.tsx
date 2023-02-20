import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Container, Content } from './styles';

interface OrdersBoardProps {
  icon: string,
  title: string,
  orders: Array<Order>,
  onCancelOrder: (orderId: string) => void;
  onChageOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function OrdersBoard({ icon, title, orders, onCancelOrder, onChageOrderStatus }: OrdersBoardProps){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus(){
    setIsLoading(true);

    const newStatus = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado`);
    onChageOrderStatus(selectedOrder!._id, newStatus);
    setIsLoading(false);
    handleCloseModal();
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    handleCloseModal();
  }

  return (
    <>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />
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
