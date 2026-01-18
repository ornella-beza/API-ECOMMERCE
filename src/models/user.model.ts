import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  name: string
  email: string
  password: string
  role: string
}

const UserSchema = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
})

export const User = mongoose.model<UserDocument>('User', UserSchema)