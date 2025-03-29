const express = require("express");

const router = express.Router();

const report = require("../models/paymentReport");

//test
router.get("/test",(req, res) => res.send("Client rotes workings"));

router.post("/",(req, res) => {
    report.create(req.body)
    .then(() => res.json({msg:"Report added successfully"}))
    .catch(() => res.status(400).json({msg: "Report adding failed" }));
});

router.get("/",(req, res) => {
    report.find()
    .then((report) => res.json(report))
    .catch(() => res.status(400).json({msg:"No reports founds"}));
});

router.get("/:id",(req, res) => {
    report.findById(req.params.id)
    .then((report)=>res.json(report))
    .catch(()=>res.status(400).json({msg:"cannot found this report"}));
})

router.put("/:id",(req, res) => {
    report.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update Successfuly"}))
    .catch(()=>res.status(400).json({msg:"Update Faild"})); 
});


router.delete("/:id",(req, res) => {
    report.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete Successfuly"}))
    .catch(() => res.status(400).json({msg: "connot be delete"}))
});
    
module.exports = router;