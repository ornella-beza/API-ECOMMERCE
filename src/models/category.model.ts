import mongoose, { Schema, Document } from 'mongoose'

export interface CategoryDocument extends Document {
  id: string
  name: string
  description?: string
}

const CategorySchema = new Schema<CategoryDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String
})

export const Category = mongoose.model<CategoryDocument>('Category', CategorySchema)