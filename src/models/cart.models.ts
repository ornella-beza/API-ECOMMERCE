import mongoose, { Schema, Document } from 'mongoose'

export interface CartItemDocument {
  id: string
  productId: string
  quantity: number
}

export interface CartDocument extends Document {
  id: string
  userId: string
  items: CartItemDocument[]
}

const CartItemSchema = new Schema<CartItemDocument>({
  id: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true }
})

const CartSchema = new Schema<CartDocument>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  items: [CartItemSchema]
})

export const Cart = mongoose.model<CartDocument>('Cart', CartSchema)