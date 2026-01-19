import { Router } from 'express'
import categoryRoutes from './category.routes.js'
import userRoutes from './user.routes.js'
import cartRoutes from './cart.routes.js'

const router = Router()

router.use('/categories', categoryRoutes)
router.use('/users', userRoutes)
router.use('/cart', cartRoutes)

export default router
 