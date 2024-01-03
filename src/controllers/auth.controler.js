const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../schemas/user.schema")

const secretKey = process.env.SECRET_KEY
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ success: false, message: 'email & password required!' })
        }

        const findUser = await User.findOne({
            where: { email: email }
        })

        if (findUser) {
            const passwordMatches = await bcrypt.compare(password, findUser.password);
            if(!passwordMatches){
                return res.status(401).json({ success: true, message: 'Incorrect Password!' })
            }
            const userData = {first_name: findUser.first_name, id: findUser.id, email:findUser.email} 
            // jwt token
            const token = jwt.sign(userData, secretKey);
          
            return res.status(200).json({ success: true, message: 'user login successfully!', token: token, data: findUser })
        } else {
            return res.status(401).json({ success: false, message: 'not registered user!' })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        if (!first_name || !last_name || !email) {
            return res.status(500).json({ success: false, message: 'fill all required fields!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const register = await User.create(
            {
                first_name,
                last_name,
                email,
                password: hashedPassword
            }
        )

        return res.status(201).json({ success: true, message: 'Signup Successfully!' })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = { login, signup }