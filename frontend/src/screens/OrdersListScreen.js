import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllAction } from '../actions/orderActions'



const OrdersListScreen = ({history}) => {

    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector((state)=>state.orderList)


    useEffect(() => {
        dispatch(listAllAction())
    }, [dispatch])

    const editOrderHandler = (id) => {
        history.push(`/order/${id}`)
    }


    return (
        <>
            <Row>
                <Col md={12}>
                    <h1>Orders</h1>

                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        <Table striped boardered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <td>Serial no.</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Paid at</td>
                                    <td>Delivered at</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.user.email}</td>
                                        <td>{order.isPaid ? order.paidAt : 
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        }</td>
                                        <td>{order.isDelivered ? order.deliveredAt : 
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                            }</td>
                                        <td>
                                            <Button variant='dark' className='sm-btn' onClick={()=>editOrderHandler(order._id)}>
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    }
                </Col>
            </Row>
        </>
    )
}

export default OrdersListScreen

