const express = require('express');
const router = express.Router();
const {signup,login,logout} = require('../api/authentication.api');
const {authorization} = require('../middleware/auth/authorization');
const {RequestValidationError} = require('@sumanauth/common');
/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 description: The username of the user.
 *               Email:
 *                 type: string
 *                 description: The email address of the user.
 *               FullName:
 *                 type: string
 *                 description: The FullName of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - Username
 *               - Email
 *               - FullName
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully registered a new user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 */

router.post('/signup',async(req,res)=>{
    // signup(req.body).then(val=>{
    //     res.status(200).send(val);
    // }).catch(err=>{
    //     res.send(err)
    // })

    try {
        const result = await signup(req.body);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error during signup:", error);
        if (error instanceof RequestValidationError) {
            // Handle validation errors
            res.status(400).send("Bad request. Invalid input data.");
        } else {
            // Handle other errors
            res.status(500).send("Internal server error.");
        }
    }
})
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in user
 *     description: Authenticate a user with their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - Username
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   description: JSON Web Token (JWT) for authenticated user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. Invalid password.
 *       '500':
 *         description: Internal server error.
 */

router.post('/login',async(req,res)=>{
    login(req.body).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        res.send(err)
    })
})
/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Log out user
 *     description: Log out an authenticated user by invalidating their session.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           format: Basic <token>
 *     responses:
 *       '200':
 *         description: User successfully logged out.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */
router.post('/logout',authorization,async(req,res)=>{
    logout(req.authdata).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        res.send(err)
    })
})


module.exports = router;