const express = require("express");

const router = express.Router();

const request = require("../models/inventoryRequest");

//test
router.get("/test",(req, res) => res.send("Request rotes workings"));

router.post("/",(req, res) => {
    request.create(req.body)
    .then(() => res.json({msg:"Request added successfully"}))
    .catch(() => res.status(400).json({msg: "Request adding failed" }));
});

router.get("/",(req, res) => {
    request.find()
    .then((request) => res.json(request))
    .catch(() => res.status(400).json({msg:"No request founds"}));
});

router.get("/:id",(req, res) => {
    request.findById(req.params.id)
    .then((request)=>res.json(request))
    .catch(()=>res.status(400).json({msg:"cannot found this request"}));
})

router.put("/:id",(req, res) => {
    request.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update Successfuly"}))
    .catch(()=>res.status(400).json({msg:"Update Faild"})); 
});


router.delete("/:id",(req, res) => {
    request.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete Successfuly"}))
    .catch(() => res.status(400).json({msg: "connot be delete"}))
});
    
module.exports = router;