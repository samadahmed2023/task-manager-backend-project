const express =require('express');
const UserController = require("../controllers/UsersControllers");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const TaskControllers = require("../controllers/TaskControllers");


const router =express.Router();

router.post('/registration',UserController.registration);
router.post('/login',UserController.login);
router.post('/profileUpdate',AuthVerifyMiddleware,UserController.profileUpdate);
router.get('/profileDetails',AuthVerifyMiddleware,UserController.profileDetails);

router.get('/RecoveryVerifyEmail/:email',UserController.RecoveryVerifyEmail);
router.get('/RecoveryVerifyOTP/:email/:otp',UserController.RecoveryVerifyOTP);
router.post('/RecoveryResetPassword',UserController.RecoveryResetPassword);


router.post('/createTask',AuthVerifyMiddleware,TaskControllers.createTask);
router.get('/deleteTask/:id',AuthVerifyMiddleware,TaskControllers.deleteTask);
router.get('/updateTaskStatus/:id/:status',AuthVerifyMiddleware,TaskControllers.updateTaskStatus);
router.get('/listTaskByStatus/:status',AuthVerifyMiddleware,TaskControllers.listTaskByStatus);
router.get('/taskStatusCount',AuthVerifyMiddleware,TaskControllers.taskStatusCount);








module.exports=router;
