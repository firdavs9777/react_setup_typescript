
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Message from '../Message';
import Loader from '../Loader';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
  _id: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  deliveredAt: string;
  __v: number;
}

interface ResponseData {
  count?: number,
  data: Order[],
  message: 'success'
}

const OrderListScreen = () => {
  const { data, isLoading, error } = useGetOrdersQuery({});
  const orders = data as ResponseData;
  return <>
    <div>Orders</div>
    {
      isLoading ? (
        <Loader />
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders && Array.isArray(orders.data) ? (
                orders.data.map((order: Order) => (

                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      ${order.totalPrice}
                    </td>
                    <td>
                      {order.isPaid && order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>

                      <td>
                      {order.isDelivered && order.deliveredAt ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </tr>
                ))
              ) : <tr>
                <td>No orders found</td>
              </tr>
            }
          </tbody>
        </Table>
      )
    }
  </>

}

export default OrderListScreen