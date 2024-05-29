import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import product1Image from '../../assets/images/airpods.jpg'
import product2Image from '../../assets/images/alexa.jpg';
import product3Image from '../../assets/images/camera.jpg';
import product4Image from '../../assets/images/mouse.jpg'
import product5Image from '../../assets/images/phone.jpg'
import product6Image from '../../assets/images/playstation.jpg'
export  interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  brand: string;
  countInStock: number;
  rating: number;
  numReview: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Airpods Pro',
    description: 'Best Airpods in the world.',
    price: '200.00',
    imageUrl: product1Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  },
  {
    id: 2,
    name: 'Alexa',
    description: 'Alexa is here on sale',
    price: '120.00',
    imageUrl: product2Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  },
  {
    id: 3,
    name: 'Professional Camera',
    description: 'Pro Camera is only on our website',
    price: '500.00',
    imageUrl: product3Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  },
    {
    id: 4,
    name: 'Mouse',
    description: 'Easy to use with any keyboard.',
    price: '30.00',
      imageUrl: product4Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  },
  {
    id: 5,
    name: 'Phone',
    description: 'New Phone is on Sale',
    price: '1220.00',
    imageUrl: product5Image,
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  },
  {
    id: 6,
    name: 'Playstation',
    description: 'Try Playstation at home and enjoy your self time.',
    price: '30.00',
    imageUrl: product6Image, 
     brand: 'Brand A',
    countInStock: 5,
    rating: 4.5,
    numReview: 10,
  }
];

const ProductList = () => {
  return (
    <Container>
      <h1>Latest Products</h1>
      <Row className="mt-4">
        {products.map((product) => (
          <Col md={6} sm={12} lg={4} xl={3} key={product.id} className="mb-4">
            <SingleProduct
              id={product.id}
              name={product.name} 
              description={product.description} 
              price={product.price} 
              imageUrl={product.imageUrl} 
              brand={product.brand}
              countInStock={product.countInStock}
              rating={product.rating}
              numReview={product.numReview}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
