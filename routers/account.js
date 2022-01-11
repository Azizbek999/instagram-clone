import express from "express";
import path from "path";
const router = express.Router();

const __dirname = path.resolve;
router.use(express.static("public"));
router.use(express.static(path.join(__dirname + '../../public')));


router.get("/edit", (req, res) => {
  res.render("account");
});

export default router;