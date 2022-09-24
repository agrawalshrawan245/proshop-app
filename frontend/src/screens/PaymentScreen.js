import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'



const PaymentScreen = ({ history }) => {
    const { shippingAddress } = useSelector((state) => state.cart)

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod ] = useState('PayPal')

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Row>
            <Col>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select payment method</Form.Label>
                    <Col>
                    <Form.Check type ='radio' label='PayPal or Credit Card' id='PayPal' name='PaymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    <Form.Check type ='radio' label='Stripe' id='Stripe' name='PaymentMethod' value='Stripe' onChange={(e)=>setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='Submit' variant='primary'>Submit</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default PaymentScreen