import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({prod}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${prod._id}`}>
            <Card.Img src={prod.image} variant='top'/>
        </a>

        <Card.Body>
            <a href={`/product/${prod._id}`}>
                <Card.Title as="h3">
                    <strong>{prod.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="div">
                <Rating value={prod.rating} text = {` ${prod.numReviews} peers`} />
            </Card.Text>

            <Card.Text as="h3">
                 ${prod.price}
            </Card.Text>


        </Card.Body>
    </Card>
  )
}

export default Product