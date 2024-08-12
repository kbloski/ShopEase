import { Payments } from "../models/PaymentsModel.js";

export class PaymentsController {
    async getAll(){
        return await Payments.findAll({});
    };

    async getById(id){
        return await Payments.findByPk(id)
    };

    async updateById(id, paymentData){
        await Payments.update(
            paymentData,
            {
                where: { id: id}
            }
        )
    };

    async deleteById(id){
        await Payments.destroy( {where: {id: id}})
    }
}