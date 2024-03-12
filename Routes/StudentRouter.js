const Express = require  ('express')

const StudentController = require('../Controller/StudentController')
const router = Express.Router();
router.post( '/addstudent', StudentController.addstudent)

module.exports=router;