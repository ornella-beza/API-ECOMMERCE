import { Router } from 'express'
import * as controller from '../controllers/cart.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get cart by user ID (authenticated)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       401:
 *         description: Not authenticated
 */
router.get('/:userId', authenticate, controller.getCartByUserId)

/**
 * @swagger
 * /api/cart/{userId}/items:
 *   post:
 *     summary: Add item to cart (authenticated)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Not authenticated
 */
router.post('/:userId/items', authenticate, controller.addItemToCart)

/**
 * @swagger
 * /api/cart/{userId}/items/{id}:
 *   put:
 *     summary: Update cart item quantity (authenticated)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart or item not found
 *       401:
 *         description: Not authenticated
 */
router.put('/:userId/items/:id', authenticate, controller.updateCartItem)

/**
 * @swagger
 * /api/cart/{userId}/items/{id}:
 *   delete:
 *     summary: Remove item from cart (authenticated)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart or item not found
 *       401:
 *         description: Not authenticated
 */
router.delete('/:userId/items/:id', authenticate, controller.deleteCartItem)

/**
 * @swagger
 * /api/cart/{userId}:
 *   delete:
 *     summary: Delete entire cart (authenticated)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: Cart deleted
 *       404:
 *         description: Cart not found
 *       401:
 *         description: Not authenticated
 */
router.delete('/:userId', authenticate, controller.deleteCart)

export default router