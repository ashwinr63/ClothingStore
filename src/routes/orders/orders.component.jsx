import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { getUserOrders } from '../../utils/firebase/firebase.utils';

const Orders = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      setLoading(true);
      setError(null);
      try {
        const result = await getUserOrders(currentUser.uid);
        setOrders(result);
      } catch (e) {
        setError(e?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!orders.length) {
    return <p>No orders yet.</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} style={{ border: '1px solid #eee', padding: '12px', marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>Order #{order.id}</div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(order, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;

