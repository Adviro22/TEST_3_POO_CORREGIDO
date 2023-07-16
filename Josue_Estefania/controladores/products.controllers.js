import { response } from 'express';
import Product from '../modelos/products.model.js'

export const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ 
            stock: { $gt: 100 } // Agregar condición de stock mayor a 100
        });

        // Actualizar el campo saldo para cada producto
        for (const product of products) {
            const saldo = product.precio * product.stock;
            await Product.findByIdAndUpdate(product._id, { $set: { saldo: saldo } });
        }

        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salió mal mientras se buscaban los productos'
        });
    }
};

export const findOneProduct = async (req, res) => {
    try {
        const { id, description } = req.query;

        let query = {};

        if (id) {
            query = { _id: id };
        } else if (description) {
            query = { description: description };
        } else {
            return res.status(400).json({ message: 'Debe proporcionar un ID o una descripción para buscar el producto.' });
        }

        const product = await Product.findOne(query);

        if (!product) {
            return res.status(404).json({ message: 'No se encontró ningún producto con el ID o descripción proporcionados.' });
        }

        if (product.precio >= 2.5 && product.precio <= 5) {
            // Actualizar el campo saldo para el producto encontrado
            const saldo = product.precio * product.stock;
            await Product.findByIdAndUpdate(product._id, { $set: { saldo: saldo } });

            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'El producto encontrado no cumple con el rango de precio permitido.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocurrió un error al buscar el producto.' });
    }
};

export const addProducts = async (req, res) => {
    try {
        const { description, precio, stock } = req.body;
        const saldo = precio * stock;

        const newProduct = new Product({
            description: description,
            precio: precio,
            stock: stock,
            saldo: saldo
        });

        const productSaved = await newProduct.save();
        res.status(201).json(productSaved);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salió mal mientras se agregaba el producto'
        });
    }
};


export const updateProduct = async (req, res) =>{
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({message: "Su tarea se ha actualizado con exito"});
};

export const deleteProduct = async (req, res) => {
    try {
        const { id, description } = req.query;
        let query = {};

        if (id) {
            query = { _id: id };
        } else if (description) {
            query = { description: description };
        } else {
            return res.status(400).json({ message: 'Debe proporcionar un ID o una descripción para eliminar el producto.' });
        }

        const deletedProduct = await Product.findOneAndDelete(query);

        if (deletedProduct) {
            return res.json({ message: 'Producto eliminado satisfactoriamente' });
        } else {
            return res.status(404).json({ message: 'No se encontró ningún producto con el ID o descripción proporcionados.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Ocurrió un error al eliminar el producto.' });
    }
};
