import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import './Header.css'
const Header = () => {
  return (
    <header>
      <Navbar className='custom-navbar' variant='dark' expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ShopSmart</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='w-100 justify-content-center justify-content-md-end'>
              <Nav.Link href='/cart' className='custom-nav-link'><FaShoppingCart /> Cart</Nav.Link>
              <Nav.Link href='/login' className='custom-nav-link'><FaUser /> Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}
export default Header;