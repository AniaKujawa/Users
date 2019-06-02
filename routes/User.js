const express = require('express');
const { User, validateUserAdd } = require('../models/User');


const router = express.Router();

router.get('/', async (req,res) => {
    const users = await User.find();
    res.status(200).send(users);
})

router.post('/', async (req, res) => {
    const { error } = validateUserAdd(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    const { nickname, email, ip, date } = req.body;

    let user = await User.findOne({nickname});
    if(user) return res.status(400).send('Nickname already used.');
  
     user = await User.findOne({email});
    if(user) return res.status(400).send('User already added.');

    user = new User({
        nickname: nickname,
        email: email,
        ip : ip,
        date: date
    });

    try {
        const response = await user.save();
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.delete('/',  async (req, res) => {
    await User.deleteMany({});
    res.status(200).send();
});

router.delete('/:email',  async (req, res) => {
    await User.deleteOne({email : req.params.email});
    res.status(200).send();
});


module.exports = router;