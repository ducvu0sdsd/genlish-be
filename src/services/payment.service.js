'use strict'
const paymentModel = require('../models/payment.model')


class PaymentService {

    insert = async (payment) => {
        try {
            const res = await paymentModel.create(payment)
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }

    update = async (id, payment) => {
        const updated = await paymentModel.findByIdAndUpdate(id, payment)
        return updated
    }

    getAll = async () => {
        const payments = await paymentModel.find().lean()
        return payments
    }

    getByProviderAndTime = async ({ from, to, provider_id }) => {
        let results = []
        let payments = await paymentModel.find({
            'provider._id': provider_id,
            createdAt: { $gte: from, $lte: to }
        });
        console.log(payments)
        payments.forEach(payment => {
            if (!results.map(item => item.course_id.toString()).includes(payment.course._id)) {
                results.push({ course_id: payment.course._id, course_name: payment.course.name, course_image: payment.course.image, numberOfEpisode: payment.course.numberOfEpisode })
            }
        })
        results = results.map(item => {
            const filter = payments.filter(payment => payment.course._id === item.course_id)
            return { ...item, payments: filter }
        })
        return results;
    }

    getBalance = async (provider_id) => {
        let payments = await paymentModel.find({
            'provider._id': provider_id,
            type: 'STUDENT_TRANFER'
        });
        return payments.reduce((total, item) => total += item.price, 0)
    }

    getByCustomer = async (customer_id) => {
        const payments = paymentModel.find({ 'customer._id': customer_id })
        return payments
    }
}

module.exports = new PaymentService()