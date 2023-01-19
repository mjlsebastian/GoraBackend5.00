const express = require('express');
const router = express.Router();
const { Contacts } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

//get contacts
router.get('/',validateToken ,async (request,response)=>{
   if(request.user.isAdmin){
    let getAllContacts = await Contacts.findAll();
    response.json(getAllContacts);
   }
   else{
    response.json({error:"Error Request"});
   }
})
//post Contacts
router.post('/', async (request,response)=>{
const contactRequest = request.body;
await Contacts.create(contactRequest);
response.json("Success");

});

//delete contact
router.delete('/:contactId', validateToken,async (request,response)=>{
const contactId = request.params.contactId;

if(request.user.isAdmin){
    await Contacts.destroy({where:{id:contactId}});
response.json("Success");
}
else{
    response.json({error:"Error Request"});
}

});

module.exports = router;