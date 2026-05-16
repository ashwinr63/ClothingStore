import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selector';
import { getUserOrders } from '../../utils/firebase/firebase.utils';
import {
  EmptyOrdersMessage,
  OrderCard,
  OrderItemsList,
  OrderMeta,
  OrdersContainer,
  OrdersTitle,
} from './orders.styles';

const formatOrderDate = (createdAt) => {
  if (!createdAt) return 'Unknown date';

  const date =
    typeof createdAt.toDate === 'function'
      ? createdAt.toDate()
      : new Date(createdAt);

  return date.toLocaleString();
};

const Orders = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      if (!currentUser?.uid) return;

      setIsLoading(true);
      setLoadError('');

      try {
        const userOrders = await getUserOrders(currentUser.uid);
        if (isMounted) {
          setOrders(userOrders);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error.message || 'Could not load orders.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.uid]);

  return (
    <OrdersContainer>
      <OrdersTitle>Your Orders</OrdersTitle>
      {isLoading && <EmptyOrdersMessage>Loading orders...</EmptyOrdersMessage>}
      {loadError && <EmptyOrdersMessage>{loadError}</EmptyOrdersMessage>}
      {!isLoading && !loadError && !orders.length && (
        <EmptyOrdersMessage>No orders yet. Complete checkout to see them here.</EmptyOrdersMessage>
      )}
      {!isLoading &&
        !loadError &&
        orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderMeta>
              <span>{formatOrderDate(order.createdAt)}</span>
              <span>₹{order.total}</span>
            </OrderMeta>
            <OrderMeta>
              <span>{order.paymentProvider}</span>
              {order.paymentId && <span>Payment: {order.paymentId}</span>}
            </OrderMeta>
            <OrderItemsList>
              {order.items?.map((item) => (
                <li key={`${order.id}-${item.id}`}>
                  {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                </li>
              ))}
            </OrderItemsList>
          </OrderCard>
        ))}
    </OrdersContainer>
  );
};

export default Orders;
