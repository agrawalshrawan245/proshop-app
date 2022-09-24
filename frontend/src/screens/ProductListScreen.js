import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, productDeleteAct, productUpdateAct, productCreateAct } from '../actions/productActions'
import axios from 'axios'


const ProductListScreen = ({history}) => {
    const [productId, setProductId] = useState(null)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const { loading, error, products } = useSelector((state)=>state.productList)


    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const editProductHandler = (product) => {
        setProductId(product._id)
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setImage(product.image)
        setDescription(product.description)
    }


    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure you want to delete.')){
            dispatch(productDeleteAct(id))
            dispatch(listProducts())
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(productId && window.confirm('Are you sure you want to update info.')){
            dispatch(productUpdateAct(productId, {name, price, brand, category, description}))
            dispatch(listProducts())
        }else if(window.confirm('Are you sure you want to create product.')){
            dispatch(productCreateAct({name, price, image, brand, category, description}))
            dispatch(listProducts())
        }
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        
        try {
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            
            const { data } = await axios.post('/api/upload', formData, config)
            console.log(data)

            setImage(data)
            setUploading(false)
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <>
            <Row>
                <Col md={4}>
					<h1>{productId ? 'Edit product form' : 'Create product form'}</h1>
					<Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>(setName(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='price' placeholder='Enter price' value={price} onChange={(e)=>(setPrice(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e)=>(setBrand(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e)=>(setImage(e.target.value))}></Form.Control>
                                <Form.Control type='file' label='Choose File' custom onChange={uploadFileHandler}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e)=>(setCategory(e.target.value))}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e)=>(setDescription(e.target.value))}></Form.Control>
                        </Form.Group>
						<Button type='Submit' variant='primary'>{productId ? 'Update' : 'Create'}</Button>
					</Form>
                </Col>
                <Col md={8}>
                    <h1>Products</h1>

                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                        <Table striped boardered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <td>Serial no.</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Category</td>
                                    <td>Brand</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                        <Row>
                                            <Button variant='dark' className='sm-btn' onClick={()=>editProductHandler(product)}>
                                                <i className='fas fa-edit' style={{color:'white'}}></i>
                                            </Button>
                                            <Button variant='danger' className='sm-btn' onClick={() => deleteProductHandler(product._id)}>
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

export default ProductListScreen

