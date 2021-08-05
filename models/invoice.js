const mongoose = require('mongoose');
const logger = require('../logger')
const invoiceSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    service: {
        type: String,
        required: true
    },
    price: {
        type: String,
    },
    due: {
        type: String,
    },
    status: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);



//Get single Invoice
module.exports={
    //Get all Invoices
    getInvoices: (callback, limit) => {
        Invoice.find(callback).limit(limit).sort([['created_at', 'ascending']]);
        // try{
        //     logger.log('info',`sucess response 200 at getAllInvoice`)
        //     return responseHandler(res, 200, null, invoice)
            
        //     }catch(error){
        //         console.log(error)
        //         logger.log('info',`error response 500 at updateInvoice`)
        //         return responseHandler(res,500,error,null)
        // }
    },

    getInvoiceById: (customer_id, callback, limit) => {
        Invoice.findById(id, callback);
    },
    
    //Get Customer Invoices
    getCustomerInvoices: (customer_id, callback, limit) => {
        const query = { customer: customer_id };
        Invoice.find(query, callback).limit(limit).sort([['created_at', 'ascending']]);
    },
    
    //Add Invoice
    addInvoice: (invoice, callback) => {
        const add = {
            customerId: invoice.customerId,
            service: invoice.service,
            price: invoice.price,
            due: invoice.due,
            status: invoice.status
        }
        Invoice.create(add, callback);
    },
    
    //Update Invoice
    updateInvoice: (id, invoice, options, callback) => {
        const query = { _id, id };
        const update = {
            service: invoice.service,
            price: invoice.price,
            due: invoice.due,
            status: invoice.status
        }
        Invoice.findOneAndUpdate(query, update, options, callback);
    },
    
    // Remove Invoice
    removeInvoice: (id, callback) => {
        const query = { _id: id };
        Invoice.remove(query, callback);
    }
    
}