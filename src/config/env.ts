import dotenv from 'dotenv'

dotenv.config()
export const env = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  emailHost: process.env.EMAIL_HOST as string,
  emailPort: parseInt(process.env.EMAIL_PORT || '587', 10),
  emailUser: process.env.EMAIL_USER as string,
  emailPass: process.env.EMAIL_PASS as string
}