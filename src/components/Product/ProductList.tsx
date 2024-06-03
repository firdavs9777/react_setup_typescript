
import { Container, Row, Col } from 'react-bootstrap';
import SingleProduct from './SingleProduct';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { ProductType, ResponseType } from './ProductData';
import Loader from '../Loader';
import Message from '../Message';


const ProductList = () => {
  const { data, isLoading, error } = useGetProductsQuery({});
  const products: ResponseType = data as ResponseType;
  return (
    <Container>
      <h1>Latest Products</h1>
      <Row className="mt-4">
        {isLoading ? (
          <Loader/>
        ) : error ? (
        <Message variant='danger'>Error Occured</Message>
        ) : products ? (
          products.data.map((product: ProductType) => (
            <Col md={6} sm={12} lg={4} xl={3} key={product._id} className="mb-4">
              <SingleProduct
                 _id={product._id}
                user={product.user}
                category={product.category}
                __v={product.__v}
                createdAt={product.createdAt}
                updatedAt={product.updatedAt}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                brand={product.brand}
                countInStock={product.countInStock}
                rating={product.rating}
                reviews={product.reviews}
                numReviews={product.numReviews}
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