const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
//const upload = multer({ dest: __dirname+"/uploads" })
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`HII Vasu`);
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/UploadFile", upload.single("myfile"), (req, res) => {
  console.log(req.file);
  const username = req.body.username;
  const uploadUser = __dirname+"/uploads/"+username
  if(!fs.existsSync(uploadUser)){
    fs.mkdirSync(uploadUser)
  }
  fs.rename(
    __dirname + "/uploads/" + req.file.filename,
   uploadUser+"/"+req.file.originalname, 
    function (a) {
      console.log(a);
    }
  );
  res.send("please wait");
});
const PORT = 3500;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
