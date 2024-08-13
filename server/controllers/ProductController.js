import { Product } from "../models/ProductModel.js";

export class ProductController {
    async getAll(){
        return await Product.findAll({});
    };

    async getById(id){
        return await Product.findByPk(id);
    };

    async getByCategory(categoryDb){
        return await Product.findAll({
            where: {
                category_id: categoryDb.id
            }
        })
    };

    async createProduct(productData, categoryDb){
        const productDb = await Product.create(productData);
        
        if (categoryDb) await productDb.setCategory(categoryDb);

        return productDb
    }

    async updateById(id, productData){
        await Product.update(productData, {
            where: {
                id: id
            }
        });
    };

    async setCategory(productDb, categoryDb){
        await productDb.setCategory(categoryDb);
    }

    async deleteById(id){
        await Product.destroy({
            where: {
                id: id
            }
        })
    };


}