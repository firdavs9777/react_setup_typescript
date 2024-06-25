import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { useProfileMutation } from '../../slices/usersSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../Message';
import Loader from '../Loader';
import { setCredentials } from '../../slices/authSlice';
import { useEffect, useState } from 'react';
import { Response } from '../../slices/authSlice';
import { useGetMyOrdersQuery } from '../../slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa';
// import { Order } from '../Product/OrderScreen';



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
  user: string;
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
  __v: number;
}

const ProfileScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data,isLoading, error } = useGetMyOrdersQuery({});
  const orders = data as Order;

  // Loading the initial phase of the page
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match')
    }
    else {
      try {
        const res: Response | any = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        console.log(res);
      }
      catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label> Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >

            </Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='my-2'>
            <Form.Label> Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >

            </Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-2'>
            <Form.Label> Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >

            </Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>Update</Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>

      <Col md={9}>
        <h1> Order History</h1>
        {
          isLoading ? (
            <Loader />
          ) :
            (
              <Table striped hover responsive variant='light' className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
         <tbody>
  {orders && Array.isArray(orders)  ? (
    orders.map((order: Order) => (
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.createdAt.substring(0, 10)}</td>
        <td>{order.totalPrice}</td>
        <td>
          {order.isPaid && order.paidAt ? (
            order.paidAt.substring(0, 10)
          ) : (
            <FaTimes style={{ color: 'red' }} />
          )}
        </td>
        {/* <td>
          {order.isDelivered && order.deliveredAt ? (
            order.deliveredAt.substring(0, 10)
          ) : (
            <FaTimes style={{ color: 'red' }} />
          )}
        </td> */}
        <td>
          <LinkContainer to={`/order/${order._id}`}>
            <Button className='btn-sm' variant='light'>
              Details
            </Button>
          </LinkContainer>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td>No orders found</td>
    </tr>
  )}
</tbody>
              </Table>
            )

        }
      </Col>

    </Row>
  )
}

export default ProfileScreen;