
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import { products } from './ProductData';
import { ProductType } from './ProductData';
const ProductList = () => {
  // const [products, setProducts] = useState<ProductType[]>([]);


  //   useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get<{ data: ProductType[] }>('http://localhost:5001/api/v1/products');
  //       setProducts(response.data.data);
  //       alert(JSON.stringify(response.data.data));
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  return (
    <Container>
      <h1>Latest Products</h1>
      <Row className="mt-4">
        { products?  products.map((product) => (
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
        )): <p>No Product yet</p>}
      </Row>
    </Container>
  );
};

export default ProductList;
