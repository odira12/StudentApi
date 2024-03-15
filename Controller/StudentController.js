const db = require("../Model/dbConnect");

const student = db.student;

module.exports={
    addstudent:async(req, res, next) =>{
        try{
            let info ={
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
            }
            const addStudent= await student.create(info)

            res.status(200).send(addStudent)
        }catch(error){
            next(error)
        }
        
    },
}