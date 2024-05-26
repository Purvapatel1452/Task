const mongoose=require('mongoose')

const expenseSchema=new mongoose.Schema({
    description: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    payerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
    groupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group', 
        default: null 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    type: { 
        type: String, 
        enum: ['group', 'non-group'], 
        required: true 
    },
    settled: { 
        type: Boolean, 
        default: false 
    }

})


expenseSchema.pre('find',function(){
  
    this.populate('payerId','_id name')
    .populate('participants','_id name')

})

expenseSchema.pre('findOne',function(){

    this.populate('payerId','_id name')
    .populate('participants','_id name')

})




const Expense=mongoose.model('Expense',expenseSchema)

module.exports=Expense