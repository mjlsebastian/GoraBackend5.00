const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bycptjs = require('bcryptjs');;
const {sign, verify} = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');


router.get('/', validateToken ,async (request,response)=>{
   if(request.user.isAdmin){
    let getAllUser = await User.findAll({attributes:{exclude:['password','isAdmin']}});
    response.json(getAllUser);
   }
   else{
    response.json({error:"Error Request"});
   }
})

// registerUser

router.post('/register', async (request,response)=>{
    const {username,email,password} = request.body;

const regUserName = await User.findOne({where: {username: username}});
const regUserEmail = await User.findOne({where: {email: email}});

if(regUserEmail || regUserName){
  if(regUserEmail){
    response.json({error:"Email already exists"})
  }
  else if(regUserName){
    response.json({error:"Username already exists"})
  }
}
else{
bycptjs.hash(password,10).then((hash)=>{
    User.create({
        username:username,
        email: email,
        password: hash,
    });
    response.json("Successful");
})
}
});

// loginUser

router.post('/login',async (request,response)=>{
    const {email,password} = request.body;

    const loginUserEmail = await User.findOne({where:{email:email}});

    if(!loginUserEmail){
        response.json({error:"User not exists"});
    }
    else{
        bycptjs.compare(password, loginUserEmail.password).then((match)=>{
            if(!match){
                response.json({error:"Wrong Username And Password Combination"});
            }
            else{
const accessToken = sign({username: loginUserEmail.username,email: loginUserEmail.email,id: loginUserEmail.id,isAdmin:loginUserEmail.isAdmin},"importantSecret")
response.json(accessToken);
            }
        })
    }

})



//get user info

router.get('/basicinfo/:userId',async (request,response)=>{
    let userId = request.params.userId;

    let getOneUser = await User.findByPk(userId,{attributes: {exclude: ['password']}})
    response.json(getOneUser);
});

// auth user from localstorage 

router.get('/auth',validateToken,(request,response)=>{
    response.json(request.user);
})


// changePassword
router.put('/changepassword',validateToken,async (request,response)=>{
let {Oldpassword,Newpassword} = request.body;
let user = await User.findByPk(request.user.id);

bycptjs.compare(Oldpassword,user.password).then((match)=>{
if(!match){
    response.json({error:"Wrong Password Entered"});
}
else{
    bycptjs.hash(Newpassword,10).then((hash)=>{
User.update({password:hash},{where:{id:request.user.id}});
response.json("Successful");
    })
}
})

});

module.exports = router;