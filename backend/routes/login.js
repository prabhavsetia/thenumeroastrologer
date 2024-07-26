const express = require('express');
const MasterLogin = require("../models/MasterLogin");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
//  Route 1 :Authenticate the master User: POST "/api/auth/login". No login Required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        let success= false;
        //If there are errors return bad request and errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const { email, password } = req.body;

        try {
            let masterLogin = await MasterLogin.findOne({ email });
            //if the masterLogin does not exists then return status and error 
            if (!masterLogin) {
                return res.status(400).json({ error: 'Credentials are wrong' })
            }
            //Comparing the password which is in the database and the password given by user
            const passwordCompare = await bcrypt.compare(password, masterLogin.password);
            //if false then send error
            if (!passwordCompare) {
                success= false;
                return res.status(400).json({ success, error: 'Credentials are wrong' })
            }

            const data = {
                masterLogin: {
                    id: masterLogin.id
                }
            }
            const authtoken = jwt.sign(data, JWT_Secret);
            success = true;
            // if authentication is done then return auth_token
            res.json({success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occured");
        }
    })

//  Route 2 :Create a masterLogin User: POST "/api/auth/createuser". No login Required
router.post('/createuser', [
    body('name', 'Enter a valid email').exists(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        let success= false;
        //If there are errors return bad request and errors
        const result = validationResult(req);
        try {
            if (!result.isEmpty()) {
                return res.send({ success, errors: result.array() });
            }
            //check wether the email exixts already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: 'User alredy exists' })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //Create a  new User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_Secret);
            // console.log(authtoken);
            success = true;
            res.json({success, authtoken })

            console.log(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occured");
        }
    })