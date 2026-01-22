import { Router } from 'express'
import * as controller from '../controllers/product.controller.js'
import { authenticate, authorize, optionalAuth } from '../middlewares/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (public with pagination, filtering, search)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *     responses:
 *       200:
 *         description: List of products with pagination
 */
router.get('/', controller.getProducts)

/**
 * @swagger
 * /api/products/stats:
 *   get:
 *     summary: Get product statistics
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product statistics by category
 */
router.get('/stats', controller.getProductStats)

/**
 * @swagger
 * /api/products/top:
 *   get:
 *     summary: Get top 10 most expensive products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Top products by price
 */
router.get('/top', controller.getTopProducts)

/**
 * @swagger
 * /api/products/low-stock:
 *   get:
 *     summary: Get low stock products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Products with low stock
 */
router.get('/low-stock', controller.getLowStockProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID (public)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', controller.getProductById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (Vendor/Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Insufficient permissions
 */
router.post('/', authenticate, authorize('vendor', 'admin'), controller.createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Owner/Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Product not found
 */
router.put('/:id', authenticate, authorize('vendor', 'admin'), controller.updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Owner/Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authenticate, authorize('vendor', 'admin'), controller.deleteProduct)

export default router