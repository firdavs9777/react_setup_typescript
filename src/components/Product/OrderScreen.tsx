import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import { useGetOrderDetailsQuery } from '../../slices/orderApiSlice'; // Assuming you have an order API slice

import React from 'react';


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

interface Order {
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


const OrderScreen: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetOrderDetailsQuery(orderId);
  console.log(data);
  const order: Order = data as Order;

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
                  <p><strong>Name: </strong> {order.user.name}</p>
                  <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city} {' '}
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
                  {/*  pay order placeholder */}
                  {/*  pay order placeholder */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
};

export default OrderScreen;