import { Router } from 'express'
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller.js'

const router = Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.get('/user/:userId', getOrdersByUser)
router.post('/', createOrder)
router.put('/:id', updateOrderStatus)
router.delete('/:id', deleteOrder)

export default router
