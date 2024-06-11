import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../Message';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../../slices/cartSlice';


interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  name: string;
  image: string;
  countInStock: number;
  // Add other properties as needed
}

const MainCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart)
  const { cartItems } = cart;
 
  const addToCartHandler = (product: any, quantity: any) => {
    dispatch(addToCart({ ...product, quantity}));
  };
    const removeFromCartHandler = (id:string) => {
    dispatch(removeFromCart(id));
  };

    const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item: any) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x:number) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                {/* Calculate the total items in array using reduce, 
                acc: number, accumulation
                item: single item,
                acc + item.quantity will sum the total quantity of items
                */}
                Subtotal ({cartItems.reduce((acc:number, item:CartItem) => acc + item.quantity, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc:number, item:CartItem) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default MainCart;