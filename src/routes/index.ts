import { Router } from 'express'
import categoryRoutes from './category.routes.js'
import userRoutes from './user.routes.js'
import cartRoutes from './cart.routes.js'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/users', userRoutes)
router.use('/cart', cartRoutes)

export default router
 