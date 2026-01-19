import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'A simple e-commerce API with categories, users, and cart management',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'string',
              description: 'UUID of the category',
            },
            name: {
              type: 'string',
              description: 'Name of the category',
            },
            description: {
              type: 'string',
              description: 'Description of the category',
            },
          },
        },
        User: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            id: {
              type: 'string',
              description: 'UUID of the user',
            },
            name: {
              type: 'string',
              description: 'Name of the user',
            },
            email: {
              type: 'string',
              description: 'Email of the user',
            },
            password: {
              type: 'string',
              description: 'Password of the user',
            },
            role: {
              type: 'string',
              description: 'Role of the user',
            },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'UUID of the cart item',
            },
            productId: {
              type: 'string',
              description: 'ID of the product',
            },
            quantity: {
              type: 'number',
              description: 'Quantity of the product',
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'UUID of the cart',
            },
            userId: {
              type: 'string',
              description: 'ID of the user who owns the cart',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}