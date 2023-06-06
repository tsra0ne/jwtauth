const express = require('express')
const router = express.Router()

router.post('/register', async (req, res, next) => {
    res.send('register route')
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