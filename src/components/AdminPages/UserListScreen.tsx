import React from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../Message';
import Loader from '../Loader';
import { toast } from 'react-toastify'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersSlice';
import { LinkContainer } from 'react-router-bootstrap';



interface UserType {
  _id: string;
  name: string;
  email: string; // Ensure this matches the API response
  password: string;
  isAdmin: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}


interface ResponseType {
  count: number;
  data: UserType[];
  message: string;
  isLoading?: boolean;
  error?: string;
}


const UserListScreen = () => {
  const { data, isLoading, error, refetch } = useGetUsersQuery({});
    
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
  
  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const users = data as ResponseType;

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1> Users</h1>
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
              <th>EMAIL</th>
              <th>ISADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && Array.isArray(users.data) && users.data.map((user: UserType) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user.isAdmin ? (
                    <FaTimes style={{ color: 'green' }} />
                  ) :
                    (<FaTimes style={{ color: 'red' }} />)
                  }
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </>

  )
}

export default UserListScreen