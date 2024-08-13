import { Category } from "../models/CategoryModel.js";

export class CategoryController{
    async getAll(){
        return await Category.findAll();
    }

    async getById(id){
        return await Category.findByPk(id)
    }

    async createCategory(categoryData){
        return await Category.create(categoryData);
    }


    async deleteById(id){
        return await Category.destroy({
            where: { id: id}
        })
    }
}