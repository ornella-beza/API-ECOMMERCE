import { Router } from 'express'
import * as controller from '../controllers/category.controller.js'


const router = Router()


router.get('/', controller.getCategories)
router.get('/:id', controller.getCategoryById)
router.post('/', controller.createCategory)
router.put('/:id', controller.updateCategory)
router.delete('/:id', controller.deleteCategory)


export default router