import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { Product } from '../models/product.model.js'

/**
 * GET /api/products
 */
export const getProducts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
}

/**
 * GET /api/products/:id
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOne({ id: req.params.id })

    if (!product) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json(product)
  } catch (e) {
    next(e)
  }
}

/**
 * POST /api/products
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Request body:', req.body)

    const product = await Product.create({
      id: uuid(),
      ...req.body
    })

    res.status(201).json(product)
  } catch (e) {
    next(e)
  }
}

/**
 * PUT /api/products/:id
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json(product)
  } catch (e) {
    next(e)
  }
}

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Product.findOneAndDelete({ id: req.params.id })

    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(204).send()
  } catch (e) {
    next(e)
  }
}
