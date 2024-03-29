const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/User')
const { authSchema } = require('../helpers/validationSchema')
const { signAccessToken } = require('../helpers/jwtHelper')

router.post('/register', async (req, res, next) => {
    try {
        // const { email, password } = req.body
        // if (!email || !password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body)

        const doesExist = await User.findOne({ email: result.email })
        if (doesExist) 
            throw createError.Conflict(`${result.email} is already been registered.`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)

        res.send({ accessToken })

    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    res.send('login route')
})

router.post('/refreshtoken', async (req, res, next) => {
    res.send('refreshtoken route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})


module.exports = router