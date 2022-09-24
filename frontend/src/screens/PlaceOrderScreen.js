import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'


const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(2)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0.00 : 20.00
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)

    const { order, success, error } = useSelector((state) => state.orderCreate)

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])
    
    
    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
    <>
        {error ? <Message variant = 'danger'>Product not created.</Message> : <></>}
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md = {8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h1>Shipping</h1>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address} {' '}, {cart.shippingAddress.city} {' '}, {cart.shippingAddress.country} {' ('} {cart.shippingAddress.postalCode} {')'}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty!!</Message>: (
                            <ListGroup variant = 'flush'>
                                {cart.cartItems.map((item, index) =>(
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={5}>
                                                {item.qty} X ${item.price} = ${item.qty * item.price}
                                            </Col>

                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroupItem>
                            Order Summary
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items price:</Col>
                                <Col>$ {cart.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>$ {cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping price: </Col>
                                <Col>$ {cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                                <Col>Total price: </Col>
                                <Col>$ {cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick = {placeOrderHandler}>Place order</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen