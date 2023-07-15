import { Router } from "express";
import * as productsCtrl from '../controladores/products.controllers.js'

const router = Router();

router.get('/', productsCtrl.findAllProducts);

router.get('/:id', productsCtrl.findOneProduct);

router.post('/', productsCtrl.addProducts);

router.put('/:id', productsCtrl.updateProduct);

router.delete('/', productsCtrl.deleteProduct);

export default router