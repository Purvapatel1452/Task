const express = require('express')
const { paymentIntent, stripeIntent, stripWebhook, upiWebhook } = require('../controllers/payment-controller')
// const { stripe } = require('..')

const stripe=require('stripe')('sk_test_51P6pcYSCdNlkqtTKEbkko3R7u9AU05pNEw9TKpeAtiEze3NmZlsWaun94sEQehiPPdlUouvIJ5d2thhp2527uaaJ00WSnKy45N')

const paymentRouter=express.Router()

paymentRouter.use(express.json())

paymentRouter.post('/create-payment-intent',paymentIntent )

// paymentRouter.post('/payee',async(req,res)=>{
//   try{
//     console.log('hi payee')
//     console.log(req.body.totalAmount)
//     const totalAmount=100
//     console.log(totalAmount)
//     if(!totalAmount){
//       return res.status(404).send({
//         success:false,
//         message:'Total Amount is require'
//       })
//     }
//     console.log("22")
//     const client_secret= await stripe.paymentIntents.create({
//       amount:Number(totalAmount),
//       currency:'usd',
     
//     })
//     console.log("22",client_secret)
//     res.status(200).send({
//       success:true,
//       client_secret
//     })

//   }catch(error){
//     console.log(error);
//     res.status(500).send({
//       success:false,
//       message:"Error In Get UPDATE Products API",
//       error,
//     })
//   }
// })




paymentRouter.post("/intents",stripeIntent)

paymentRouter.post('/stripe/webhook',stripWebhook )

paymentRouter.post('/upi-webhook',upiWebhook)

  

module.exports=paymentRouter