import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { adminGetUsersAction, adminDeleteUserAction, getUserDetails, updateUserDetails } from '../actions/userActions'



const ListUsersScreen = ({history}) => {
    const [userId, setUserId] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const {loading, error, users} = useSelector((state) => state.adminGetUsers)

    const {user} = useSelector((state) => state.userDetails)

    const { userInfo} = useSelector((state) => state.userLogin)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(adminGetUsersAction())
        }else{
            history.push('/login')
        }
    }, [dispatch])


    const updateHandler = () => {
        // e.preventDefault()
        if(userId !== null){
            dispatch(updateUserDetails(userId, {name, email, isAdmin}))
            dispatch(adminGetUsersAction())
        }
        // history.push('/users/admin')
    }

    const editUserHandler = (user) => {
        dispatch(getUserDetails(user._id))
        setUserId(user._id)
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }

    const deleteUserHandler = (id) => {
        if(window.confirm('Are you sure you want to delete')){
            dispatch(adminDeleteUserAction(id))
        }
    }

    return (
        <>
            <Row>
                <Col md={4}>
					<h1>Edit user {name}</h1>
					<Form onSubmit={updateHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>(setName(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>(setEmail(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin'>
                                <Form.Check type='checkbox' label='Is admin' checked={isAdmin} onChange={(e)=>(setIsAdmin(e.target.checked))}></Form.Check>
                        </Form.Group>
						<Button type='Submit' variant='primary'>Update</Button>
					</Form>
                </Col>
                <Col md={8}>
                    <h1>Users</h1>

                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        <Table striped boardered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Admin</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? 
                                                <i className='fas fa-check' style={{color:'green'}}></i> :
                                                <i className='fas fa-times' style={{color:'red'}}></i>
                                            }</td>
                                        <td>
                                        <Row>
                                            <Button variant='dark' className='sm-btn' onClick={()=>editUserHandler(user)}>
                                                <i className='fas fa-edit' style={{color:'white'}}></i>
                                            </Button>
                                            <Button variant='danger' className='sm-btn' onClick={() => deleteUserHandler(user._id)}>
                                                <i className='fas fa-trash' style={{color:'white'}}></i>
                                            </Button>
                                        </Row>
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

export default ListUsersScreen

