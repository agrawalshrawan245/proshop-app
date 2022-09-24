import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Container, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, reviewCreateAct } from '../actions/productActions'
import Loading from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({history, match}) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const { loading, product, error } = useSelector(stateee => stateee.productDetails)

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const reviewSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(reviewCreateAct(match.params.id, {rating, comment}))
        dispatch(listProductDetails(match.params.id))
        setComment('')
        setRating(0)
    }

    // const product = {}

    return (
        <>
        <a href="/"><Button variant='light'>Go back</Button></a>
        { loading ? <Loading />
        : error ? <Message variant = 'danger'>{error}</Message>
        : (
            <>
            <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>{product.name}</h2> 
                    </ListGroupItem>

                    <ListGroupItem>
                        <Rating value={product.rating} text={` ${product.numReviews} peer`} />
                    </ListGroupItem>
                    
                    <ListGroupItem>
                        <h3>${product.price}</h3>
                    </ListGroupItem>
                    
                    <ListGroupItem>
                        <div>{product.description}</div>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>Price</Col>
                                <Col>${product.price}</Col>
                            </Row>

                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Status</Col>
                                <Col>
                                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                </Col>
                            </Row>

                        </ListGroupItem>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Form.Control as='select' value='2' onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x +1} value ={x+1}>{x+1}</option>
                                        ))}
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroupItem>
                            <Container>
                                <Button 
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}>Add to cart</Button>
                            </Container>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h1>Reviews</h1>
                    {product && product.reviews.length === 0 && <Message>No reviews.</Message>}
                    <ListGroup variant='flush'>
                        {product && product.reviews.map(review => (
                            <ListGroupItem key = {review._id}>
                                <strong>User: {`${review.name}`}</strong>
                                <Rating value={review.rating} text={`reviews`} />
                                <strong>Comment: {`${review.comment}`}</strong>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <Form onSubmit={reviewSubmitHandler}>
                        <Form.Group controlId='rating'>
                        <Form.Label>Rating (out of 5): </Form.Label>
                        <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value=''>Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Better</option>
                                <option value="5">5 - Excellent</option>
                            </Form.Select>                            
                        </Form.Group>
                        <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as='textarea' rows={3} value={comment} onChange={(e)=>setComment(e.target.value)} />
                        </Form.Group>
                        <Button type='primary'>Submit</Button>
                    </Form>
                </Col>
            </Row>
            </>
        )}
    </>
  )
}

export default ProductScreen