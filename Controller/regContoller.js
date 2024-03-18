const db = require("../model/dbConnect");

const reg = db.reg;

module.exports = {
    
    // Add Reg

    addReg: async(req, res, next) => {
        try {
            let info = {
                regName: req.body.regName,
                regEmail: req.body.regEmail,
                regPassword: req.body.regPassword,
            }

            const addReg = await reg.create(info)

            res.status(200).send(addReg)
        } catch (error) {
            next(error)
        }
    },
}