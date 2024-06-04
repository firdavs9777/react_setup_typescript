import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from "../Rating/Rating";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader";
import Message from "../Message";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

export interface ProductResponseType {
  data: {
    _id: string;
    user: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    reviews: any[]; // Define this more specifically if you know the structure of reviews
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  isLoading: boolean;
  error: string;
}
// export interface ResponseType {
//   count: number;
//   data: ProductType;
//   message: string;
//   isLoading: boolean;
//   error: boolean;
// }
const ProductScreen: React.FC = () => {
  const { id:productId } = useParams()
  const ProductId = (productId as string);
  const { data, isLoading, error } = useGetProductDetailsQuery(ProductId);
  const product: ProductResponseType = data as ProductResponseType;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const addToCartHandler = () => {
   dispatch(addToCart({
      _id: product.data._id,
      price: product.data.price,
     qty: quantity,
     name: product.data.name,
     image: product.data.image,
     countInStock: product.data.countInStock
   }));
    navigate('/cart');
  }

  return (
    <>
      <h1>Product Detail Page</h1>
      {
        isLoading ? (
          <Loader/>
        ) : error ? (
                <Message variant='danger'>Error Occured</Message>
        ): product.data ? (
        <div>
          <Link className="btn btn-light my03" to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
     <Card.Img variant="top" src={product.data.image} alt={product.data.name} />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{ product.data.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.data.rating} text={`${product.data.numReviews}`} color="#f8e825" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.data.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.data.description}
                </ListGroup.Item>          
          </ListGroup>
        </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.data.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                            <Col>
                              <strong>{product.data.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </strong>
                            </Col>
                   </Row>
                        </ListGroup.Item>
                        
                        {product.data.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Quantity</Col>
                              <Col>
                                <Form.Control
                                  as="select"
                                  value={quantity}
                                  onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                  {[...Array(product.data.countInStock).keys()].map((x) => (
                                    <option key={x +1 } value={ x + 1}>
                                      {x + 1}
                                      </option>
                                    ))}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ) }
                      <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled={product.data.countInStock === 0} onClick={addToCartHandler}>
                      Add to Cart
                 </Button>
                </ListGroup.Item>
                </ListGroup>
              </Card>
        </Col>
      </Row>
        </div>
      ) : (
        <p>Product not found.</p>
      )
    }
    </>
  );
};

export default ProductScreen;
