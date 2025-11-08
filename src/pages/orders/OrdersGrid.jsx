import { OrderDetailGrid } from './OrderDetailGrid';
import { OrderHeader } from './OrderHeader';
export function OrdersGrid({order,loadCart}) {
  return (
    <div key={order.id} className="order-container">
      <OrderHeader order={order} />

      <OrderDetailGrid order={order} loadCart={loadCart}/>
    </div>
  );
}
