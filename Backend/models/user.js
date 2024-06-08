
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true 

    },
    image:{
        type:String,
        default:"ss"
    },
    friendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    sentFriendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group"
        }
    ],
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    balance:{
        type:Number,
        default:0
    }
})


const User=mongoose.model('User',userSchema)

module.exports=User






























// import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// interface userProps extends Document {
//     name: string;
//     email: string;
//     password: string;
//     image: string;
//     friendRequests: Types.ObjectId[];
//     sentFriendRequests: Types.ObjectId[];
//     friends: Types.ObjectId[];
// }

// const userSchema: Schema<userProps> = new Schema<userProps>({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     friendRequests: [{
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }],
//     sentFriendRequests: [{
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }],
//     friends: [{
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }],
// });

// const User: Model<userProps> = mongoose.model<userProps>('User', userSchema);

// export default User;























