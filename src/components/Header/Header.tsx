import React from 'react';
import { Container, Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import './Header.css'
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutUserMutation } from '../../slices/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/index'

import {logout} from '../../slices/authSlice'

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutUserMutation();


  const logoutHandler = async () => {
    try {
      logoutApiCall({  userInfo }).unwrap();
      dispatch(logout(userInfo)); // Corrected dispatch call without passing userInfo
      navigate('/login');
    }
    catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ShopSmart</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='w-100 justify-content-center justify-content-md-end'>
              <LinkContainer to='/cart'>
                <Nav.Link className='custom-nav-link'><FaShoppingCart /> Cart {cart.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cart.length}
                  </Badge>
                )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={`${userInfo.data? userInfo.data.name : userInfo.name}`} id="username" >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                  <Nav.Link  href='/login' className='custom-nav-link'><FaUser /> Sign In</Nav.Link>
              )}
              { userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id='adminMenu'>
                  <LinkContainer to="/admin/productList">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                      <LinkContainer to="/admin/userList">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                      <LinkContainer to="/admin/orderList">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                    <LinkContainer to="/lotto">
                  <NavDropdown.Item>Lotto</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}
export default Header;