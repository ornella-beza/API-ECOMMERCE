import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { Category } from '../models/category.model.js'

export const getCategories = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Category.find())
  } catch (e) { next(e) }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({ id: req.params.id })
    if (!category) return res.status(404).json({ message: 'Not found' })
    res.json(category)
  } catch (e) { next(e) }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.create({ id: uuid(), ...req.body })
    res.status(201).json(category)
  } catch (e) { next(e) }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    if (!category) return res.status(404).json({ message: 'Not found' })
    res.json(category)
  } catch (e) { next(e) }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Category.findOneAndDelete({ id: req.params.id })
    if (!result) return res.status(404).json({ message: 'Not found' })
    res.status(204).send()
  } catch (e) { next(e) }
}