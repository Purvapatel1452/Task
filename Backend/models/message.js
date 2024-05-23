
const mongoose=require("mongoose")


const messageSchema=new mongoose.Schema({
   
    senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    recepientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
},
    messageType:{
        type:String,
        enum:['text','image'],
        required:true
    },
    message:String,
    imageUrl:String,
    timeStamp:{
        type:Date,
        default:Date.now
    }



})


const Message=mongoose.model('Message',messageSchema)

module.exports=Message

















// import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// interface messageProps extends Document {
//     senderId: Types.ObjectId;
//     recepient: Types.ObjectId;
//     messageType: 'text' | 'image';
//     message?: string;
//     imageUrl?: string;
//     timeStamp: Date;
// }

// const messageSchema: Schema<messageProps> = new Schema<messageProps>({

//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     recepient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     messageType: {
//         type: String,
//         enum: ['text', 'image'],
//         required: true
//     },
//     message: {
//         type: String
//     },
//     imageUrl: {
//         type: String
//     },
//     timeStamp: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Message: Model<messageProps> = mongoose.model<messageProps>('Message', messageSchema);

// export default Message;





























// const mongoose=require("mongoose")


// const messageSchema=new mongoose.Schema({
   
//     senderId:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User"
//     },
//     recepient:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User"
//     },
//     messageType:{
//         type:mongoose.Schema.Types.ObjectId,
//         enum:['text','image']
//     },
//     message:String,
//     imageUrl:String,
//     timeStamp:{
//         type:Date,
//         default:Date.now
//     }



// })


// const Message=mongoose.model('Message',messageSchema)

// module.exports=Message

























// import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// interface MessageProps extends Document {
//     senderId: Types.ObjectId;
//     recepient: Types.ObjectId;
//     messageType: 'text' | 'image';
//     message?: string;
//     imageUrl?: string;
//     timeStamp: Date;
// }

// const messageSchema: Schema<MessageProps> = new Schema<MessageProps>({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     recepient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     messageType: {
//         type: String,
//         enum: ['text', 'image'],
//         required: true
//     },
//     message: {
//         type: String
//     },
//     imageUrl: {
//         type: String
//     },
//     timeStamp: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Message: Model<MessageProps> = mongoose.model<MessageProps>('Message', messageSchema);

// export default Message;







