import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'



const OrderScreen = ({ match }) => {
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const { loading, order, error } = useSelector((state) => state.orderDetails)
    const { userInfo } = useSelector(state => state.userLogin)

    const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay)

    useEffect(() => {
        const addPayPalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || order._id !== match.params.id || successPay){
            dispatch(getOrderDetails(match.params.id)) 
        }else if(!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch, order, match.params.id, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(match.params.id, paymentResult))
    }

    const deliverHandler = async() => {
        dispatch(deliverOrder(order._id))
        dispatch(getOrderDetails(match.params.id)) 
    }
    

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
    <>
        <Row>
        <Col md = {8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <p>
                            <h2>Order no. {order._id}</h2>
                        </p>
                        <p>
                            <h4>Payee details</h4>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong> <a href={`mailto${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address} {' '}, {order.shippingAddress.city} {' '}, {order.shippingAddress.country} {' ('} {order.shippingAddress.postalCode} {')'}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not delivered.</Message>}
                    </ListGroupItem>
                    <ListGroupItem>
                        <p>
                            <h4>Payment Method</h4>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not paid.</Message>}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4>Order Items</h4>
                        {order.orderItems.length === 0 ? <Message>Your cart is empty!!</Message>: (
                            <ListGroup variant = 'flush'>
                                {order.orderItems.map((item, index) =>(
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
                            <ListGroupItem>
                                    <Row><h5>Disclaimer: These are fake products.</h5></Row>
                                    <Row>For testing purpose you can use these fake ID's.</Row>
                                    <Card>
                                        <Col>
                                            <Row>User Id1: proshoptest1@personal.example.com</Row>
                                            <Row>Password1: i"5s8?#X</Row>
                                        </Col>
                                    </Card>
                                    <Card>
                                        <Col>
                                            <Row>User Id12: proshoptest2@personal.example.com</Row>
                                            <Row>Password2: uR3=|PDs</Row>
                                        </Col>
                                    </Card>
                            </ListGroupItem>
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroupItem>
                            <h4>Order Summary</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col><div>Items price:</div></Col>
                                <Col>$ {order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>$ {order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping price: </Col>
                                <Col>$ {order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total price: </Col>
                                <Col>$ {order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroupItem>
                        { !order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice.toFixed(2)} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroupItem>
                        )}
                        {userInfo.isAdmin &&
                            <ListGroupItem>
                                <Button  variant='dark' className='sm-btn' onClick={deliverHandler}>Mark as delivered</Button>
                            </ListGroupItem>
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen