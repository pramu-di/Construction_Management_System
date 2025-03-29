const express = require("express");

const router = express.Router();

const ireport = require("../models/inventoryReport");

//test
router.get("/test",(req, res) => res.send("Report rotes workings"));

router.post("/",(req, res) => {
    ireport.create(req.body)
    .then(() => res.json({msg:"Report added successfully"}))
    .catch(() => res.status(400).json({msg: "Report adding failed" }));
});

router.get("/",(req, res) => {
    ireport.find()
    .then((ireport) => res.json(ireport))
    .catch(() => res.status(400).json({msg:"No report founds"}));
});

router.get("/:id",(req, res) => {
    ireport.findById(req.params.id)
    .then((ireport)=>res.json(ireport))
    .catch(()=>res.status(400).json({msg:"cannot found this report"}));
})

router.put("/:id",(req, res) => {
    ireport.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update Successfuly"}))
    .catch(()=>res.status(400).json({msg:"Update Faild"})); 
});


router.delete("/:id",(req, res) => {
    ireport.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete Successfuly"}))
    .catch(() => res.status(400).json({msg: "connot be delete"}))
});
    
module.exports = router;