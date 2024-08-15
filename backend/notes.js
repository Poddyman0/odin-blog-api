const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

// protect route
// uses the token
app.post('/route/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post Created...",
                authData: authData,

            })
        }
    })

})
// below returnes the token
app.post('/route/login', (req, res) => {
    // user authentification - to change
    const user ={
        username: "example username",
        email: "example@email.com,"
    }
    jwt.sign({user: user}, 'secretkey',{ expiresIn:'24h' }, (err, token) => {
        res.json({
            token: token
        })
    })
})

//format of token
// Authoization: Bearer <access_token>

// verifyToken
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers('authorization')
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        //next middleware
        next();
    } else {
        res.sendStatus(403)
    }
}

/*
    frontend code:
    get token when logged in 
    save token to local storage
    set header value
    authorization: Bearer TOKEN
    TOKEN must be replaced with actual token
*/

app.listen(3000, () => console.log("Sarver started on port 3000"))