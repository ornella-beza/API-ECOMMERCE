import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { Cart } from '../models/cart.models.js'

/**
 * GET /api/cart/:userId
 */
export const getCartByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    res.json(cart)
  } catch (e) {
    next(e)
  }
}

/**
 * POST /api/cart/:userId/items
 * Add item to cart
 */
export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const { productId, quantity } = req.body

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({
        id: uuid(),
        userId: Array.isArray(userId) ? userId[0] : userId,
        items: [{ id: uuid(), productId, quantity }]
      })
      return res.status(201).json(cart)
    }

    cart.items.push({
      id: uuid(),
      productId,
      quantity
    })

    await cart.save()
    res.status(201).json(cart)
  } catch (e) {
    next(e)
  }
}

/**
 * PUT /api/cart/:userId/items/:id
 * Update item quantity
 */
export const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, id } = req.params
    const { quantity } = req.body

    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const item = cart.items.find(item => item.id === id)
    if (!item) return res.status(404).json({ message: 'Item not found' })

    item.quantity = quantity
    await cart.save()

    res.json(cart)
  } catch (e) {
    next(e)
  }
}

/**
 * DELETE /api/cart/:userId/items/:id
 * Remove item from cart
 */
export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, id } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    cart.items = cart.items.filter(item => item.id !== id)
    await cart.save()

    res.json(cart)
  } catch (e) {
    next(e)
  }
}

/**
 * DELETE /api/cart/:userId
 * Delete entire cart
 */
export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Cart.findOneAndDelete({ userId: req.params.userId })
    if (!result) return res.status(404).json({ message: 'Cart not found' })
    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
