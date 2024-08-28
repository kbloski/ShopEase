import { Reviews } from "../models/ReviewsModel.js";

export class ReviewController {
    async getAll(){
        return await Reviews.findAll();
    };

    async getById(id){
        return await Reviews.findByPk(id);
    }

    async getReviewsByUserId(userId){
        return await Reviews.findAll( { where: { userId: userId}});
    }

    async getAllByProductId(productId){
        return await Reviews.findAll({where: { productId: productId}});
    };

    async setUser(reviewDb, userDb){
        await this.updateById(reviewDb.id, { userId: userDb.id});
    }

    async setProduct(reviewDb, productDb){
        await this.updateById(reviewDb.id, { productId: productDb.id});
    }

    async createReview (reviewData, userDb, productDb){
        
        const reviewDb = await Reviews.create( reviewData );

        if (userDb) await  reviewDb.setUser(userDb);
        if (productDb) await reviewDb.setProduct(productDb);

        return reviewDb;
    }

    async updateById(id, reviewData){
        await Reviews.update(reviewData, { where: { id: id}})
    }

    async deleteById(id){
        await Reviews.destroy( {where: { id: id}})
    }

}