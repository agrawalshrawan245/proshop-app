import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()
connectDB()
const app = express()

app.use(express.json())

// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'))
// }

const port = process.env.PORT
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment port ${port}!`))

app.use('/api/users', userRoutes)

app.use('/api/products', productRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/api/orders', orderRoutes)


app.use('/api/upload', uploadRoutes)

app.use(notFound)

app.use(errorHandler)


const __dirname = path.resolve()

app.use('/uploads', express.static(__dirname + '/uploads'))


