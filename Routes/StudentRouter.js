const Express = require  ('express')
const StudentController = require('../Controller/StudentController');
const router = Express.Router();


router.get("/addstudent",StudentController.addstudent);
router.post( '/addstudent', StudentController.addstudent);
router.put("/addstudent",StudentController.addstudent);
router.delete("/addstudent",StudentController.addstudent);


module.exports=router;