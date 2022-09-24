import React from 'react'
import { Nav, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1?(
                <Card>
                    <Nav.Link><Link to='/login'>Sign In</Link></Nav.Link>
                </Card>
            ) : (
                <Nav.Link disabled>Sign In</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step2?(
                <Card>
                    <Nav.Link><Link to='/shipping'>Shipping</Link></Nav.Link>
                </Card>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step3?(
                <Card>
                    <Nav.Link><Link to='/payment'>Payment</Link></Nav.Link>
                </Card>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step4?(
                <Card>
                    <Nav.Link><Link to='/placeorder'>Place order</Link></Nav.Link>
                </Card>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>

    </Nav>
  )
}

export default CheckoutSteps