import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import Message from '../Message';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import { ProductType } from '../Product/ProductData';


export interface ResponseType {
  data: ProductType;
  message: string;
}

const ProductEditScreen: React.FC = () => {
  const { id: productId } = useParams();
  const ProductId = (productId as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error, refetch } = useGetProductDetailsQuery(ProductId);
  const product = data as ResponseType;

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  // Upload Image apislice
  const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();


  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    refetch();
    if (product) {
      setName(product.data.name);
      setPrice(product.data.price);
      setImage(product.data.image);
      setBrand(product.data.brand);
      setCategory(product.data.category);
      setCountInStock(product.data.countInStock);
      setDescription(product.data.description);
    }
  }, [product, refetch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(ProductId);
      const  updatedProduct = {
        _id: ProductId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      };
      const result = await updateProduct(updatedProduct).unwrap();
      console.log(result);
      toast.success('Product updated successfully');
      navigate('/admin/productList');
    } catch (error: any) {
      toast.error(error.toString());
    }
  };
// interface UploadResponse {
//   message: string;
//   image: string;
// }
  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log(e.target.files);
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      const selectedFile = e.target.files[0];
      console.log('Selected File', selectedFile);
      formData.append('image', selectedFile);
      console.log('FormData', formData);
      try {
        const response = await uploadProductImage(formData).unwrap();
        if (response)
        {

        toast.success('good')          
        }
        // setImage(response.data); // Assuming the response includes the updated image URL
        toast.success('Image uploaded successfully');
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      }
    }
    else 
    {
      console.log('erro')
      }
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.toString()}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type="file"
                  placeholder='Choose a file'
                  onChange={uploadFileHandler}
                >
                </Form.Control>
                {loadingUpload && <Loader />}
              </Form.Group>
              
        
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter count in stock'
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      )}
    </>
);

}

export default ProductEditScreen;
