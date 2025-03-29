const express = require("express");

const router = express.Router();

const employee = require("../models/employeePayment");

//test
router.get("/test",(req, res) => res.send("Employee rotes workings"));

router.post("/",(req, res) => {
    employee.create(req.body)
    .then(() => res.json({msg:"Employee added successfully"}))
    .catch(() => res.status(400).json({msg: "Employee adding failed" }));
});

router.get("/",(req, res) => {
    employee.find()
    .then((employee) => res.json(employee))
    .catch(() => res.status(400).json({msg:"No employee founds"}));
});

router.get("/:id",(req, res) => {
    employee.findById(req.params.id)
    .then((employee)=>res.json(employee))
    .catch(()=>res.status(400).json({msg:"cannot found this employee"}));
})

router.put("/:id",(req, res) => {
    employee.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update Successfuly"}))
    .catch(()=>res.status(400).json({msg:"Update Faild"})); 
});


router.delete("/:id",(req, res) => {
    employee.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete Successfuly"}))
    .catch(() => res.status(400).json({msg: "connot be delete"}))
});
    
module.exports = router;