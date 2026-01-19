import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { Order } from '../models/order.model.js'

const calculateTotal = (items: any[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

/**
 * GET /api/orders
 */
export const getOrders = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Order.find())
  } catch (e) {
    next(e)
  }
}

/**
 * GET /api/orders/:id
 */
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findOne({ id: req.params.id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (e) {
    next(e)
  }
}

/**
 * GET /api/orders/user/:userId
 */
export const getOrdersByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Order.find({ userId: req.params.userId }))
  } catch (e) {
    next(e)
  }
}

/**
 * POST /api/orders
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, items } = req.body

    const order = await Order.create({
      id: uuid(),
      userId,
      items,
      totalAmount: calculateTotal(items),
      status: 'PENDING'
    })

    res.status(201).json(order)
  } catch (e) {
    next(e)
  }
}

/**
 * PUT /api/orders/:id
 */
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true }
    )

    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (e) {
    next(e)
  }
}

/**
 * DELETE /api/orders/:id
 */
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
