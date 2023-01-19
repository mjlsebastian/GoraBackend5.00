const express = require('express');
const router = express.Router();
const { Booked } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

//get books
router.get('/', validateToken , async (request,response)=>{
  if(request.user.isAdmin){
    const listOfBooked = await Booked.findAll();
  response.json(listOfBooked);
  }
else{
  response.json({error:"Error Request"});
}
});


//get user Booked
router.get('/books/:userId',validateToken,async (request,response)=>{
  const userId = request.params.userId;
  const listOfUserBooked = await Booked.findAll({where: {UserId: userId}});
response.json(listOfUserBooked);
});


//post books
router.post('/',validateToken ,async (request,response)=>{
const bookedRequest = request.body;
bookedRequest.UserId = request.user.id
await Booked.create(bookedRequest);
response.json(bookedRequest);
})


//delete contact
router.delete('/:contactId', validateToken,async (request,response)=>{
  const bookId = request.params.contactId;
  
  if(request.user.isAdmin){
      await Booked.destroy({where:{id:bookId}});
  response.json("Success");
  }
  else{
      response.json({error:"Error Request"});
  }
  
  });

module.exports = router;