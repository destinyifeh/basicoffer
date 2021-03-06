const User = require('../models/User');

module.exports={
    checkUser: function(req, res, next){
         
        if(req.isAuthenticated()){
            return next();
        }else{
        
            req.flash('error_msg', 'Unauthorized !')
            res.redirect('back')
        
        }
            
 },

 checkAdmin: async function (req, res, next){
     try{
     if(req.user.isAdmin || req.user.superAdmin){
        return next();

     }else{
           req.flash('error_msg', 'Unauthorized access!');
            res.redirect('back');
     }
    }
    catch(err){
        console.log(err.message)
        res.redirect('/500');
    }
 },
 checkSuper: async function (req, res, next){
    try{
    if(req.user.superAdmin){
       return next();

    }else{
          req.flash('error_msg', 'Unauthorized access!');
           res.redirect('back');
    }
   }
   catch(err){
       console.log(err.message)
       res.redirect('/500');
   }
},

checkVerified: async function (req, res, next){
    try{
      let user = await User.findOne({username: req.body.username})
    if(user.isVerified){
       return next();

    }else{
          req.flash('error_msg', 'Your admin account has not been verified. Please check your email to verify your account');
           res.redirect('back');
    }
   }
   catch(err){
       console.log(err.message)
       res.redirect('/500');
   }
},
 
  
};