import mongoose, { Schema, Document } from 'mongoose'

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
}

export interface OrderDocument extends Document {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: string
  createdAt: Date
}

const OrderItemSchema = new Schema<OrderItem>({
  id: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
})

const OrderSchema = new Schema<OrderDocument>({
  id: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Order = mongoose.model<OrderDocument>('Order', OrderSchema)
