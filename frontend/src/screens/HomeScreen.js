import { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions'; 
import Product from '../components/Product';
import Loading from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({match}) => {
	
	const dispatch = useDispatch()
	
	const productList = useSelector(stateee => stateee.productList )
	const { loading, error, products } = productList

	useEffect(() => {
		dispatch(listProducts(match.params.keyword))
	}, [dispatch])
	
	
	return (
		<>
			<h1>Latest Products</h1>
			{ loading ? <Loading />
	        : error ? <Message variant = 'danger'>{error}</Message>
			:	(<Row>
						{products.map((product) => (
								<Col key = {product._id} sm={12} md={6} lg={4} xl={3}>
										<Product prod = {product} />
								</Col>
						))}
				</Row>)
			}
		</>
	)
}

export default HomeScreen