import { Picture } from "../models/PictureModel.js";

export class PictureController {
    async getAll(){
        return await Picture.findAll({});
    };

    async getById(id){
        return await Picture.findByPk(id)
    };

    async getByProductId(id){
        return await Picture.findAll({where: { product_id: id} })
    };

    async createPicture(pictureData){
        return await Picture.create(pictureData)
    };

    async setProduct(pictureDb, productDb){
        await Picture.update( { product_id: productDb.id} , { where: { id: pictureDb.id }})
        // await PictureDb.setProduct(productDb)
    };

    async updateById(id, pictureData){
        return await Picture.update(pictureData, { where: {id: id } });
    };

    async deleteById(id){
        await Picture.destroy({where: {id: id}})
    }
}