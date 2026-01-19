import express from 'express'
import routes from './routes/index.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { setupSwagger } from './config/swagger.js'

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Setup Swagger documentation
setupSwagger(app)

app.use('/api', routes)
app.use(errorHandler)

export default app
