import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { Product } from '../models/product.model.js'

interface AuthRequest extends Request {
  user?: any
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, search, sort = 'createdAt' } = req.query
    
    const filter: any = {}
    if (category) filter.categoryId = category
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (search) filter.$text = { $search: search as string }

    const products = await Product.find(filter)
      .sort(sort as string)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Product.countDocuments(filter)
    
    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (e) { next(e) }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOne({ id: req.params.id })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (e) { next(e) }
}

export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create({
      id: uuid(),
      ...req.body,
      vendorId: req.user.id
    })
    res.status(201).json(product)
  } catch (e) { next(e) }
}

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOne({ id: req.params.id })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    
    // Check ownership (vendor can only update their own products)
    if (req.user.role === 'vendor' && product.vendorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own products' })
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    res.json(updatedProduct)
  } catch (e) { next(e) }
}

export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOne({ id: req.params.id })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    
    // Check ownership (vendor can only delete their own products)
    if (req.user.role === 'vendor' && product.vendorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own products' })
    }

    await Product.findOneAndDelete({ id: req.params.id })
    res.status(204).send()
  } catch (e) { next(e) }
}

export const getProductStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$categoryId',
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ])
    res.json(stats)
  } catch (e) { next(e) }
}

export const getTopProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find().sort({ price: -1 }).limit(10)
    res.json(products)
  } catch (e) { next(e) }
}

export const getLowStockProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { threshold = 10 } = req.query
    const products = await Product.find({ stock: { $lte: Number(threshold) } })
    res.json(products)
  } catch (e) { next(e) }
}