import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../Message';
import Loader from '../Loader';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { ProductType, ResponseType } from '../Product/ProductData';
import { toast } from 'react-toastify';

const ProductListScreen: React.FC = () => {
  const { data, isLoading, error,refetch } = useGetProductsQuery({});
  const [createProduct, { isLoading: productLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();


  const products = data as ResponseType;

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct({});
        refetch();
      }
      catch(error: any) {
        toast.error(error);
      }
   }
  }

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      try {
        await deleteProduct(id);
        refetch();
      }
      catch(error: any) {
        toast.error(error);
      }
   }
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button onClick={createProductHandler}>
            <FaEdit  /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.toString()}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && Array.isArray(products.data) && products.data.map((product: ProductType) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListScreen;
