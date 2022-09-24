import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'



const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => (state.userLogin))

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* <LinkContainer to='/'></LinkContainer> */}
        <Navbar.Brand href='/'>Proshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Route render={({history}) => <SearchBox history = {history} /> } />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto">
            <Container>
              <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              {userInfo ?             
              
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              
                  <NavDropdown.Item href="/profile"><i class="fa fa-cog fa-spin fa-lg fa-fw"></i>Profile and orders</NavDropdown.Item>
                  
                  {/* <NavDropdown.Item href="/orders">Orders</NavDropdown.Item> */}
                  
                  <NavDropdown.Item href="/link_to_android">Get PROSHOP for android</NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

            </NavDropdown>: 
              <Nav.Link href="/login"><i className='fas fa-user'></i>Sign in</Nav.Link>}

              {userInfo && userInfo.isAdmin && (
                  <NavDropdown title={'Admin'} id="basic-nav-dropdown">
      
                      <NavDropdown.Item href="/users/admin">Edit users</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/products">Edit products</NavDropdown.Item>
                      <NavDropdown.Item href="/admin/orders">Edit orders</NavDropdown.Item>
                      
                      {/* <NavDropdown.Item href="/orders">Orders</NavDropdown.Item> */}
                      
                      {/* <NavDropdown.Item href="/link_to_android">Get PROSHOP for android</NavDropdown.Item> */}
                      
                      {/* <NavDropdown.Divider /> */}
                      {/* <NavDropdown.Item onClick={logoutHandler}><i className='fas fa-logout'></i>Logout</NavDropdown.Item> */}

                </NavDropdown>
              )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>  )
}

export default Header