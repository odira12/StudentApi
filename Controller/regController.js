const { signAccessToken } = require("../Helpers/jwtHelpers");
const db = require("../model/dbConnect");
const createError = require("http-errors");
const {authSchema} = require("../Helpers/validateSchema")

const reg = db.reg;

module.exports = {
    
    // Add Reg

    addReg: async(req, res, next) => {
        try {
            const {email, password} = await authSchema.validateAsync (eq.body);
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
    // Get All Reg
    getAllReg: async(req, res, next) => {
        try {
            let regs = await reg.findAll({})
            res.status(200).send(regs)
        } catch (error) {
            next(error)
        }
    },
    
    // Get Reg by ID
    getReg: async(req, res, next) => {
        try {
            let id = req.params.id
            let Reg = await reg.findOne({where: {reg_id: id}})

            if(!reg) {
                throw(createError(404, "Registration does not exist."))
            }
            res.status(200).send(Reg)
        } catch (error) {
            next(error)
        }
    },

    // Update Reg by ID
    updateReg: async(req, res, next) => {
        try {
            let id = req.params.id

            const updateReg = await reg.update(req.body, {where: {reg_id: id}})

            if(!reg) {
                throw(createError(404, "Registration does not exist."))
            }
            res.status(200).send(updateReg)
        } catch (error) {
            next(error)
        }
    },

}
