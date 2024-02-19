const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

//http://localhost:3001/
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;