const { signAccessToken } = require("../Helpers/jwtHelpers");
const { signRefreshToken } = require("../Helpers/jwtHelpers");
const db = require("../model/dbConnect");
const {authSchema} = require("../Helpers/validateSchema")
const createHttpError = require('http-errors')

const reg = db.reg;

module.exports = {
    
    // Add Reg

    addReg: async(req, res, next) => {
        try {
            const {regName, regEmail, regPassword} = await authSchema.validateAsync (req.body);
            const exist = await reg.findOne({where: {regEmail}});
            if (exist) {
                throw createHttpError.Conflict(`${regEmail} is already in use`);
            } 
            const newUser = new reg({regName, regEmail, regPassword})
            const saveUser = await newUser.save()

            const accessToken = await signAccessToken(saveUser.reg_id);
            res.status(200).send({accessToken})

            } catch (error) {
            next(error)
        }

    },

    loginUser: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            const user = await reg.findOne({where: {regEmail: result.regEmail}})

            if (!user) throw createHttpError.NotFound("User not registered");

            // Watching the password
            const isMatch = await user.isValidPassword(result.regPassword);
            if (!isMatch) throw createHttpError.Unauthorized("Invalid Password");

            // If password matches, then generate token
            const accessToken = await signAccessToken(user.reg_id);
            const refreshToken = await signRefreshToken(user.reg_id);

            res.send({accessToken, refreshToken})
        } catch (error) {
            if (error.isJoi === true)
                return next(createHttpError.BadRequest("Invalid Username/Password"));
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
