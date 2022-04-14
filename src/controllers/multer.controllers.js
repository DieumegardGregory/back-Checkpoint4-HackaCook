const multer = require("multer");
const fs = require("fs");

const postImageObj = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (_, file, cb) => {
      cb(null, 'images');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  const upload = multer({storage}).single("file");
  upload(req, res, next, (err) => {
    if (err) {
      res.status(500).json({errorMessage: err.message});
    } else {
      next();
    };
  });
};

const deleteImageObj = (req, res, next) => {
  const name = req.params.imageName;
  try {
    fs.unlinkSync(`src/images/${name}`);
    next();
  } catch (err) {
    res.status(500).json({errorMessage: err.message})
  };
};

module.exports = {
  postImageObj,
  deleteImageObj,
}