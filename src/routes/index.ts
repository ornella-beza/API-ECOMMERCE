import { Router } from 'express'
import categoryRoutes from '../routes/category.routes.js'
import userRoutes from '../routes/user.routes.js'

const router = Router()
router.use('/categories', categoryRoutes)
router.use('/users', userRoutes)


export default router