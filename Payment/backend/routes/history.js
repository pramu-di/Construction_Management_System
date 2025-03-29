const express = require("express");

const router = express.Router();

const history = require("../models/paymentHistory");

//test
router.get("/test",(req, res) => res.send("History rotes workings"));

router.post("/",(req, res) => {
    history.create(req.body)
    .then(() => res.json({msg:"History added successfully"}))
    .catch(() => res.status(400).json({msg: "History adding failed" }));
});

router.get("/",(req, res) => {
    history.find()
    .then((history) => res.json(history))
    .catch(() => res.status(400).json({msg:"No history founds"}));
});

router.get("/:id",(req, res) => {
    history.findById(req.params.id)
    .then((history)=>res.json(history))
    .catch(()=>res.status(400).json({msg:"cannot found this history"}));
})

router.put("/:id",(req, res) => {
    history.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update Successfuly"}))
    .catch(()=>res.status(400).json({msg:"Update Faild"})); 
});


router.delete("/:id",(req, res) => {
    history.findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete Successfuly"}))
    .catch(() => res.status(400).json({msg: "connot be delete"}))
});
    
module.exports = router;