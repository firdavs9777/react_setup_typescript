import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import Rating from "../Rating/Rating";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader";
import Message from "../Message";

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
                    <Col><strong>{ product.data.countInStock > 0 ? 'In Stock': 'Out of Stock'}</strong></Col>
                   </Row>
                  </ListGroup.Item>
                      <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled={product.data.countInStock === 0}>
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
