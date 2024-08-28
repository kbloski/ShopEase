import { Reviews } from "../models/ReviewsModel.js";

export class ReviewController {
    async getAll(){
        return await Reviews.findAll();
    };

    async getById(id){
        return await Reviews.findByPk(id);
    }

    async getReviewsByUserId(userId){
        return await Reviews.findAll( { where: { user_id: userId}});
    }

    async getAllByProductId(productId){
        return await Reviews.findAll({where: { product_id: productId}});
    };

    async setUser(reviewDb, userDb){
        await Reviews.updateById(reviewDb.id, { user_id: userDb.id});
    }

    async setProduct(reviewDb, productDb){
        await Reviews.updateById(reviewDb.id, { product_id: productDb.id});
    }

    async createReview (reviewData, userDb, productDb){
        
        const reviewDb = await Reviews.create( reviewData );

        if (userDb) await  reviewDb.setUser(userDb);
        if (productDb) await reviewDb.setProduct(productDb);

        return reviewDb;
    }

    async updateById(id, reviewData){
        return await Reviews.update(reviewData, { where: { id: id}})
    }

    async deleteById(id){
        await Reviews.destroy( {where: { id: id}})
    }

}