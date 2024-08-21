import { Reviews } from "../models/ReviewsModel.js";

export class ReviewController {
    async getAll(){
        return await Reviews.findAll();
    };

    async getById(id){
        return await Reviews.findByPk(id);
    }

    async getAllByProductId(productId){
        return await Reviews.findAll({where: { productId: productId}})
    };

    async setUser(reviewDb, userDb){
        await reviewDb.setUser(userDb)
    }

    async setProduct(reviewDb, productDb){
        await reviewDb.setProduct(productDb)
    }

    async createReview (reviewData, userDb, productDb){
        const reviewDb = await Reviews.create(reviewData);

        if (userDb) await  reviewDb.setUser(userDb);
        if (productDb) await reviewDb.setProduct(productDb);
    }

    async updateById(id, reviewData){
        await Reviews.update(reviewData, { where: { id: id}})
    }

    async deleteById(id){
        await Reviews.destroy( {where: { id: id}})
    }

}