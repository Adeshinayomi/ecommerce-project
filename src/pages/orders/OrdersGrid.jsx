import { OrderDetailGrid } from './OrderDetailGrid';
import { OrderHeader } from './OrderHeader';
export function OrdersGrid({order}) {
  return (
    <div key={order.id} className="order-container">
      <OrderHeader order={order} />

      <OrderDetailGrid order={order} />
    </div>
  );
}
