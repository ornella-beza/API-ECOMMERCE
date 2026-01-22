import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { v4 as uuid } from 'uuid'
import { User } from '../models/user.model.js'
import { env } from '../config/env.js'
import { sendEmail } from '../utils/email.js'

const signToken = (id: string) => {
  return jwt.sign({ id }, env.jwtSecret as string, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions)
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id)
  const { password, ...userWithoutPassword } = user.toObject()
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user: userWithoutPassword }
  })
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body
    
     const existingUser = await User.findOne({ email  })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      id: uuid(),
      name,
      email,
      password,
      role: role || 'customer'
    })

    // Send welcome email
  //  await sendEmail({
  //     to: user.email,
  //     subject: 'Welcome to E-Commerce API',
  //     text: `Welcome ${user.name}! Your account has been created successfully.`
  //   })

    createSendToken(user, 201, res)
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' })
    }

    createSendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetURL}`
    })

    res.status(200).json({ message: 'Password reset email sent' })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token as string).digest('hex')
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' })
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    await sendEmail({
      to: user.email,
      subject: 'Password Changed Successfully',
      text: 'Your password has been changed successfully.'
    })

    createSendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findOne({ id: (req as any).user.id }).select('+password')

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    await sendEmail({
      to: user.email,
      subject: 'Password Changed Successfully',
      text: 'Your password has been changed successfully.'
    })

    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ id: (req as any).user.id })
    res.json({ status: 'success', data: { user } })
  } catch (error) {
    next(error)
  }
}