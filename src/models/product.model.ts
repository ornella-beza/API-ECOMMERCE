import mongoose, { Schema, Document } from 'mongoose'

export interface ProductDocument extends Document {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  categoryId: string
  vendorId: string
  images: string[]
}

const ProductSchema = new Schema<ProductDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  categoryId: { type: String, required: true },
  vendorId: { type: String, required: true },
  images: [String]
}, {
  timestamps: true
})

ProductSchema.index({ name: 'text', description: 'text' })
ProductSchema.index({ categoryId: 1 })
ProductSchema.index({ vendorId: 1 })
ProductSchema.index({ price: 1 })

export const Product = mongoose.model<ProductDocument>('Product', ProductSchema)