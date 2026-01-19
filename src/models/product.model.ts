import mongoose, { Schema, Document } from 'mongoose'

export interface ProductDocument extends Document{
    id:string,
    name:string,
    description?:string,
    price:number,
    categoryId:string

}
const ProductSchema=new Schema<ProductDocument>({
    id:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    description:String,
    price:{type:Number,required:true},
    categoryId:{type:String,required:true}
})
export const Product=mongoose.model<ProductDocument>('Product',ProductSchema)