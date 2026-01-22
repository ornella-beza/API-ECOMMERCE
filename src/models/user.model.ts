import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'vendor' | 'customer'
  profileImage?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'vendor', 'customer'], default: 'customer' },
  profileImage: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
})

UserSchema.pre('save', async function(next: any) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<UserDocument>('User', UserSchema)