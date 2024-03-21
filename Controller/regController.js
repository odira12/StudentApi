const { signAccessToken } = require("../Helpers/jwtHelpers");
const db = require("../model/dbConnect");
const createError = require("http-errors");

const reg = db.reg;

module.exports = {
    
    // Add Reg

    addReg: async(req, res, next) => {
        try {
            const {email, password} = req.body;
            const exist = await UserActivation.findOne({where: {email}});
            if (exist) {
                throw createError.Conflict('${email} is already in use');
            } 
            const newUser = new User({email, password})
            const saveUser = await newUser.save()

            const accessToken = await signAccessToken(saveUser.reg_id);
            res.status(200).send({accessToken})

            } catch (error) {
            next(error)
        }
    },
}
