const express = require('express')
const router = express.Router()
const User = require('../models/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    console.log('middleware called')
    const authHeader = req.headers['authorization']
    const token = authHeader
    if(token == null)   return res.status(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get('/user', authenticateToken, async (req, res) => {
    try{
        const users = await User.find({ email: req.user.email});
        res.status(200).json({
            fname: users[0].fname,
            lname: users[0].lname,
            email: users[0].email,
            wishlist: users[0].wishlist            
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


router.put('/user', authenticateToken, async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const newPassword = req.query.newPassword;

    var user = await User.find({ email: email});
    if(user == null){
        return res.status(400).send('Cannot find user');
    }
    user = user[0];
    try{
        if(await bcrypt.compare(password, user.password) && email == user.email){
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            user.fname = req.query.fname ? req.query.fname : user.fname;
            user.lname = req.query.lname ? req.query.lname : user.lname;
            user.save()
            res.send('Details Updated');
        }
        else{
        res.send('Incorrect Details');
        }
    }
    catch(err){
        console.log(err.message);
    }
})


router.post('/signup', async (req, res) => {
    try{
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        var user = await User.find({ email: email});
        if(user.length!==0){
            return res.status(403).send('User already exists.');
        }
        hashedPassword = await bcrypt.hash(password, salt);
        var user = new User({ 
            fname: fname,
            lname: lname,
            password: hashedPassword,
            email: email,
            wishlist: []
        });
        await console.log(user);
        user = await user.save();
        res.status(200).json({
            signupStatus: "true",
            // data: {
            //     fname: user.fname,
            //     lname: user.lname,
            //     email: user.email,
            //     wishlist: user.wishlist
            // }
        });    
    }
    catch(err){
        res.status(400).json({
            signupStatus: "false"
        });
    }
})


router.post('/login', async (req, res) => {
    try{
        const email = req.body.lemail;
        const pass = req.body.lpassword;
        var user = await User.find({ email: email});
        if(!user.length){
            return res.status(400).send('User does not exist/ Invalid Email');
        }
        user = user[0];
        if(await bcrypt.compare(pass, user.password)){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
            return res.status(200).json({
                loginStatus: true,
                accessToken: accessToken,
                fname: user.fname
            })
        }
        else{
            return res.status(401).json({
                loginStatus: false,
                message: 'Invalid Credentials'
            })
        }
        
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


router.get('/wishlist', authenticateToken, async (req, res) => {
    try{
        const email = req.user.email;
        var user = await User.find({ email: email});
        if(!user.length){
            return res.status(400).send('User does not exist');
        }
        user = user[0];
        if(req.user.password === user.password){
            return res.status(200).json({
                wishlist: user.wishlist
            })
        }
        else{
            return res.send('Invalid Password');
        }
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})


router.put('/wishlist',authenticateToken, async (req, res) => {
    try{
        var email = req.user.email;
        var user = await User.find({ email: email});
        user = user[0];
        if(req.user.password === user.password){
            var wishlist = user.wishlist;
            wishlist.push({slug: req.body.slug, gameID: parseInt(req.body.gameID), steamID: parseInt(req.body.steamID)});
            await user.save();
            return res.status(200).json({
            message: "Wishlist Updated Successfully"
        })
        }
        else{
            return res.send('Invalid Token');
        }
    }
    catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router;