import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
const router = express.Router();

var photoList = mongoose.Schema({
  description: String,
  like: String,
  messagesNum: String,
  img: String,
});

const Images = mongoose.model("images", photoList);

const __dirname = path.resolve;
router.use(express.static("uploads"));
router.use(express.static("public"));
router.use(express.static(path.join(__dirname + "../uploads")));
router.use(express.static(path.join(__dirname + "../public")));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/, '-').replace(/:/, '-') + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  Images.find({}, function (err, images) {
    res.render("index", {
      photoList: images,
    });
  });
});

router.get("/post/:postId", async (req, res) => {
  try {
    const post = await Images.findById(req.params.postId)
    // res.json({post})
    res.render("post", {
      post: post
    })
  }
  catch(err) {
    res.json({message: err})
  }
})

router.get("/channel", (req, res) => {
  res.render("channel");
});

router.get("/saved", (req, res) => {
  res.render("saved");
});

router.get("/tagged", (req, res) => {
  res.render("tagged");
});

router.get("/create", (req, res) => {
  res.render("create-photo");
});

router.post("/create/upload", upload.single("image"), async (req, res) => {
  const data = new Images({
    description: req.body.description,
    like: "0",
    messagesNum: "0",
    img: req.file.filename,
  });
  Images.create(data, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/username/");
    }
  });
});

router.post("/post/delete/:postId", async (req, res) => {
  try {
    const post = await Images.findById(req.params.postId).deleteOne();
    // res.json({post})
    res.redirect("/username/");
  }
  catch(err) {
    res.json({message: err})
  }
})

export default router;
