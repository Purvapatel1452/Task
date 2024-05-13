const express = require('express')
// const { stripe } = require('..')

const stripe=require('stripe')('sk_test_51P6pcYSCdNlkqtTKEbkko3R7u9AU05pNEw9TKpeAtiEze3NmZlsWaun94sEQehiPPdlUouvIJ5d2thhp2527uaaJ00WSnKy45N')

const paymentRouter=express.Router()

paymentRouter.use(express.json())

paymentRouter.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('payyy')

      const paymentIntent = await stripe.paymentIntents.create({
          payment_method_types: ['card'],
          amount: 1099,
          currency: 'usd',
      });
      console.log('2md',res)

      res.status(200).json(paymentIntent);
  } catch (error) {
      res.status(505).send(JSON.stringify(error))
  }
})

paymentRouter.post('/payee',async(req,res)=>{
  try{
    console.log('hi payee')
    console.log(req.body.totalAmount)
    const totalAmount=100
    console.log(totalAmount)
    if(!totalAmount){
      return res.status(404).send({
        success:false,
        message:'Total Amount is require'
      })
    }
    console.log("22")
    const client_secret= await stripe.paymentIntents.create({
      amount:Number(totalAmount),
      currency:'usd',
     
    })
    console.log("22",client_secret)
    res.status(200).send({
      success:true,
      client_secret
    })

  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error In Get UPDATE Products API",
      error,
    })
  }
})




paymentRouter.post("/intents",async(req,res)=>{
    console.log("patyment")

 try{   
    const {amount}=req.body
    console.log(amount)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:16522,
        currency:'INR',
        // payment_method:'pm_card_visa',
        automatic_payment_methods:{
          enabled:true
        }
     
    })
    console.log("@")

    res.json({paymentIntent:paymentIntent.client_secret})

}
catch (e) {
    console.log("eoro",e)
    res.status(400).json({
      error: e.message,
    });
}


})

paymentRouter.post('/stripe/webhook', async (req, res) => {
  console.log("WEBHOOK")
  const event = req.body;
  console.log("RR",event.data.object)

  // Handle the payment_intent.succeeded event
  if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log("RRee",event.data.object.amount)
      
      // Store payment data in your database
      // Example: Save paymentIntent.id or any other necessary data
      
      console.log('PaymentIntent was successful',paymentIntent);
  }
  console.log("TT",event.data.object.amount)
  res.json({ received: true,data:event.data });
});


  

module.exports=paymentRouter