const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
   nickname: { type: String, required: true },
   email: { type: String, required: true },
   ip: { type: String, required: true },
   date: { type: Date, required: true },
});


const User = mongoose.model('User', userSchema);

const validateUserAdd = (user) => {
    const schema = Joi.object().keys({
        nickname: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        ip: Joi.string().regex(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/),
        date: Joi.date().required(),
    })
    return Joi.validate(user,schema)
}

module.exports = { User, validateUserAdd };