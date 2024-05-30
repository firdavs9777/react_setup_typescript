import React from "react";
import { Link, useParams } from "react-router-dom";
import {products} from './ProductData'; // Assuming ProductList exports an array of products
import { ProductType } from "./ProductData";
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import Rating from "../Rating";


const ProductScreen: React.FC = () => {
  const { id: productId } = useParams();
  const numericProductId = Number(productId);
  const product: ProductType | undefined = products.find((p: ProductType) => p.id === numericProductId );
  console.log(product)
  
  return (
    <>
      <h1>Product Detail Page</h1>
      {product ? (
        <div>
          <Link className="btn btn-light my03" to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
     <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{ product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReview}`} color="#f8e825" />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>          
          </ListGroup>
        </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${ product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col><strong>{ product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</strong></Col>
                   </Row>
                  </ListGroup.Item>
                      <ListGroup.Item>
                    <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
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
      )}
    </>
  );
};

export default ProductScreen;
