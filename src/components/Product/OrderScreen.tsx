import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalCliendIdQuery } from '../../slices/orderApiSlice';
import { PayPalButtons, usePayPalScriptReducer, DISPATCH_ACTION, SCRIPT_LOADING_STATE, CreateOrderBraintreeActions, OnApproveBraintreeData, OnApproveBraintreeActions } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

// Define interfaces and enums
interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  user: {
    name: string;
    email: string;
  };
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
// type PayPalDispatchAction =
//   | { type: DISPATCH_ACTION.RESET_OPTIONS; value: any }
//   | { type: DISPATCH_ACTION.SET_LOADING_STATUS; value: SCRIPT_LOADING_STATE };

const OrderScreen: React.FC = () => {
   const { id: orderId } = useParams<{ id: string }>();
  const { data: orderData, refetch, isLoading, isError, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state: any) => state.auth);

  const { data: paypalData, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalCliendIdQuery(orderId);

  const order: Order = orderData as Order;


  useEffect(() => {
    const currency = 'USD';
    if (!errorPayPal && !loadingPayPal && paypalData) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: {
            'clientId': (paypalData as any).clientId,
            currency: currency,
          },
        });
        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      if (order && !order.isPaid) {
          if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypalData, paypalDispatch, loadingPayPal, errorPayPal]);


  const createOrder = (data: object, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice.toString(),
          },
        },
      ],
    }).then((orderId: string) => {
      return orderId;
    });
  };

  const onApprove = async (data: any, actions: OnApproveBraintreeActions) => {
    return actions.order?.capture().then(async function (details: any) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      }
      catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }



  const onApproveTest = async () => {
    const response = await payOrder({ orderId, details: { payer: {} } }).unwrap();
    console.log(response);
    console.log(await payOrder({ orderId, details: { payer: {} } }));
    refetch();
    toast.success('Payment successful');
  }
  const onError = (err: any) => {
    // Implement onError function for PayPalButtons
    toast.error(err.message);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Message variant="danger">{(error as any)?.data?.message}</Message>;
  }

  return (
    <div>
      {order && (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">Delivered on {order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.quantity} x ${item.price} = ${item.quantity * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <>
                          <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>
                            Test Pay Order
                          </Button>
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={(data, actions: any) => onApprove(data, actions)}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default OrderScreen;
