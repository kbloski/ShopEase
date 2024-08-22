import { Picture } from "../models/PictureModel.js";

export class PictureController {
    async getAll(){
        return await Picture.findAll({});
    };

    async getById(id){
        return await Picture.findByPk(id)
    };

    async createPicture(pictureData){
        return await Picture.create(pictureData)
    }

    async setProduct(PictureDb, productDb){
        await PictureDb.setProduct(productDb)
    };

    async updateById(id, PictureData){
        await Picture.update(PictureData, {
            where: {
                id: id
            }
        })
    };

    async deleteById(id){
        await Picture.destroy({where: {id: id}})
    }
}