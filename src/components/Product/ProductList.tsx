import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { ProductType } from './ProductData';

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});
  return (
    <Container>
      <h1>Latest Products</h1>
      <Row className="mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : products ? (
          products.data.map((product:ProductType) => (
            <Col md={6} sm={12} lg={4} xl={3} key={product._id} className="mb-4">
              <SingleProduct
                _id={product._id}
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
          ))
        ) : (
          <p>No Product yet</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;


