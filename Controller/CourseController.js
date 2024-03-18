const db = require("../model/dbConnect");
const course = db.course;
module.exports = {

    // Add Course

    addCourse: async(req, res, next) => {
        try {
            let info = {
                courseName: req.body.courseName,
            }
            const addCourse = await course.create(info)
            res.status(200).send(addCourse)
        } catch (error) {
            next(error)
        }
    },

    // Get All Courses
    
    getAllCourse: async(req, res, next) => {
        try {
            let courses = await course.findAll({})
            res.status(200).send(courses)
        } catch (error) {
            next(error)
        }
    },
}