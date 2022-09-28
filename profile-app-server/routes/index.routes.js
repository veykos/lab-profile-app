const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.put("/users", (req,res,next) => {
  res.json({message: 'to be added'})
})

router.get("/users", (req,res,next) => {
  res.json({message: 'to be added'})
})

router.post("/upload", (req,res,next) => {
  res.json({message:'to be added'})
})


module.exports = router;
