import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { User } from '../models/user.model.js'

export const getUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await User.find())
  } catch (e) { next(e) }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.json(user)
  } catch (e) { next(e) }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create({ id: uuid(), ...req.body })
    res.status(201).json(user)
  } catch (e) { next(e) }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.json(user)
  } catch (e) { next(e) }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id })
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.status(204).send()
  } catch (e) { next(e) }
}