import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import Message from '../Message';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersSlice';

import { UserType } from '../../slices/authSlice';



const UserEditScreen: React.FC = () => {
  const { id: userId } = useParams();
  const UserId = (userId as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetUserDetailsQuery(UserId);
  console.log(data);
  const user = data as UserType;
  console.log('User', user);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    refetch();
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, refetch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = {
        _id: UserId,
        email, isAdmin, name
      };
      const result = await updateUser(updatedUser).unwrap();
      console.log(result);
      toast.success('Product updated successfully');
      navigate('/admin/userList');
    } catch (error: any) {
      toast.error(error.toString());
    }
  };
  // interface UploadResponse {
  //   message: string;
  //   image: string;
  // }


  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
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
              <p>{ name }</p>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>


          <Form.Group controlId='isAdmin'>
            <Form.Label>IsAdmin</Form.Label>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            >
            </Form.Check>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      )}
    </>
  );

}

export default UserEditScreen;
