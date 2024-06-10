import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Checkout from './Checkout';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Message from '../Message';
import Loader from '../Loader';
import { useCreateOrderMutation } from '../../slices/orderApiSlice';
import { clearCartItems } from '../../slices/cartSlice';


const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart);

  // Calculate prices and show the overall result
  // If the address is already there it will calculate the overall component cycle
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
    else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong> Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong> Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message> Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item: any, index: any) => (
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  ))}
                </ListGroup>
              )}
        
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${cart.itemsPrice }</Col>
                </Row>
              </ListGroup.Item>
                   <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cart.shippingPrice }</Col>
                </Row>
              </ListGroup.Item>
                    <ListGroup.Item>
                <Row>
                  <Col>Tax Price: </Col>
                  <Col>${cart.shippingPrice }</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

  )
}

export default PlaceOrder