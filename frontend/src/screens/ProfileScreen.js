import React, { useEffect, useState} from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { listMyAction } from '../actions/orderActions'



const ProfileScreen = ({history, location}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')
	const [message2, setMessage2] = useState('')

	const dispatch = useDispatch()
	const { loading, error, user } = useSelector((state) => state.userDetails)

    const { loading: orderLoading, error: orderError, orders } = useSelector((state) => state.orderListMy)

    const { userInfo } = useSelector((state) => state.userLogin)

    const { success } = useSelector((state) => state.userUpdate)

	useEffect(()=>{
		if(!userInfo){
			history.push('/login')
		} else {
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyAction())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
	}, [history, userInfo, dispatch,  user])

	const submitHandler = (e) => {
		e.preventDefault()
        if(confirmPassword !== password){
            setMessage("Passwords do not match")
        }else{
            dispatch(updateUserDetails('profile', {id:user._id, name, email,  password}))
            if(success){
                setMessage2("Profile updated!!")
            }
        }
	}


	return (
        <Row>
            <Col md={4}>
                <h1>User profile</h1>
                {error && <Message variant = 'danger'>{error}</Message>}
                {message && <Message variant = 'danger'>{message}</Message>}
                {message2 && <Message variant = 'success'>{message2}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>(setName(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>(setEmail(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>(setPassword(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e)=>(setConfirmPassword(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Button type='Submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
                {orderLoading ? <Loader /> : orderError ? <Message variant='danger'>{orderError}</Message> : (
                    <Table striped boardered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    }</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    }</td>
                                    <td>
                                        <a href={`/order/${order._id}`}>
                                            <Button variant='dark'>Details</Button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
            </Row>
	)
}

export default ProfileScreen

