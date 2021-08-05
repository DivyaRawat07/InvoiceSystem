const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const admin = require('./admin')
const TOKEN_SECRET = 'mytoken'
const logger = require('../logger')
module.exports = {

  defaultCreate: async (req,res)=>{
    try{
        const user = await UserModel.find();
        if(user.length===0){
            const defultUser = await UserModel.create({name:'Divya',
                email:'rawatdivya206@gmail.com',
                status:ROLE.isSuperAdmin,
                createdBy:new ObjectId()
            })
            const token = await defualtUser.generateAuthToken();
            res.status(200).json({defaultUser,token});
            return;
        }
        res.status(200).json({message:"login required for any process"})
    } catch (error){
        res.status(500).json({message:"something went wrong"})
    }
},

  //Sign Up Route 
  signUp: async (req, res) => {
    
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }

    const isAdmin = await User.findOne({ isAdmin: req.body.isAdmin });
    if (isAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const isEmailExists = await User.findOne({ email: req.body.email });

    if (isEmailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }



    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
      isAdmin: req.body.isAdmin
    });
    try {
      const savedUser = await user.save();
      res.json({ data: savedUser });
    } catch (error) {
      res.status(400).json({ error });
    }

    try{
      logger.log('info',`sucess response 200 at getAllInvoice`)
      return responseHandler(res, 200, null, invoice)
      
      }catch(error){
          console.log(error)
          logger.log('info',`error response 500 at updateInvoice`)
          return responseHandler(res,500,error,null)
  }
  },

  //reset password

  resetPassword: (req, res) => {
    User.findOneAndUpdate(
      { name: req.body.name },
      { $set: { password: req.body.password } },
      (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        const msg = {
          msg: "password successfully updated",
          name: req.body.name,
        };
        return res.json(msg)
      }
    );

  },

  // Login Route
  login: async (req, res) => {
    // Validate JOI Schema
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    // Find if the email is correct or not
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({ error: 'Email id in incorrect' });
    }

    // Check if the password is correct
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ error: 'Password is incorrect' })
    }

    // Create Token
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        isAdmin: this.isAdmin
      },
      TOKEN_SECRET
    );

    res.header("auth-token", token).json({
      error: null,
      data: {
        token,
      },
    })

    res.json({
      error: null,
      data: {
        message: "Login Successful"
      },
    })
  },


  // getUser: (req, res) => {
  //   User.findById(req.user, (err, user) => {
  //     console.log(req.user);
  //     console.log(user);
  //     res.send(user);
  //   });
  // }

  getUser: (req, res) => {
    User.findById(req.body._id, function (err, user) {
      if (err) {
        return res.status(400).json({ error: 'id is incorrect' })
      }
      //console.log(user)
      res.send(user);

    });
  }
}

