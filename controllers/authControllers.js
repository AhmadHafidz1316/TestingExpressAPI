const { User } = require('../models')

exports.registerUser = async (req,res) => {
    try {
        let {name,email,password, passwordConfirm} = req.body

        if(password != passwordConfirm) {
            return res.status(400).json({
                message
            })
        }

    } catch (error) {
        
    }
}