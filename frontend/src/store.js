import { createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers, productCreateReducers, productUpdateReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegiterReducer, userDetailsReducer, userUpdateReducer,
			adminGetUsersReducer, adminDeleteUserReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailReducer, orderPayReducer, orderListMyReducer, orderDeliverReducer, orderListReducer } from './reducers/orderReducers';



const reducer = combineReducers({
	cart: cartReducer,

	orderCreate: orderCreateReducer,
	orderDetails: orderDetailReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
	orderDeliver: orderDeliverReducer,
	orderList: orderListReducer,

	productList : productListReducers,
	productDetails : productDetailsReducers,
	productCreate: productCreateReducers,
	productUpdate: productUpdateReducers,

	userLogin: userLoginReducer,
	userRegister: userRegiterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	adminGetUsers: adminGetUsersReducer,
	adminDeleteUser: adminDeleteUserReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
	cart: { cartItems: cartItemsFromStorage,
			shippingAddress: shippingAddressFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
	(applyMiddleware(...middleware)))


export default store

