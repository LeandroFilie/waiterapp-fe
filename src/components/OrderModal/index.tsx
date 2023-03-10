import { Actions, Button, Details, Item, ModalBody, OrderDetails, OrderItems, Overlay, StatusContainer, Total } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import formatCurrency from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
  isLoading: boolean;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
  isLoading }: OrderModalProps){

  useEffect(() => {
    function onCloseKeyEsc(event: KeyboardEvent){
      if(event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onCloseKeyEsc);

    return () => {
      document.removeEventListener('keydown', onCloseKeyEsc);
    };
  }, [onClose]);

  if(!visible || !order){
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar" />
          </button>
        </header>

        <StatusContainer>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕛'}
              {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de Espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </StatusContainer>

        <OrderDetails>
          <strong>Itens</strong>

          <OrderItems>
            {order.products.map(({ _id, product, quantity }) => (
              <Item key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />

                <span>{quantity}x</span>

                <Details>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </Details>
              </Item>
            ))}
          </OrderItems>

          <Total>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </Total>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <Button variant="primary" disabled={isLoading} onClick={onChangeOrderStatus}>
              <span>
                {order.status === 'WAITING' && '🧑‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </Button>
          )}

          <Button variant="secondary" onClick={onCancelOrder} disabled={isLoading}>
            <strong>Cancelar Pedido</strong>
          </Button>

        </Actions>
      </ModalBody>
    </Overlay>
  );
}
