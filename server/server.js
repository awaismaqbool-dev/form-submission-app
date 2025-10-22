import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { form_Schema } from "./modules/formSchema.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
// // Get the parent directory for html render
const currentDirectory = process.cwd();
const parentDirectory= path.dirname(currentDirectory);


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(parentDirectory, "client")));


// folder check (optional safety)
import fs from "fs";
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {

    const newFilename=req.body.PhoneNumber;
    const ext = path.extname(file.originalname);
    // const uniqueName = newFilename + ext;
    cb(null, file.fieldname + '-' + Date.now() +  ext);
  },
});
const upload = multer({ storage });

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(parentDirectory, "client", "index.html"));
  
});

app.post("/", upload.single("image"), async (req, res) => {
// console.log("Body:", req.body);
//   console.log("File:", req.file);
try{
// mongodb connect
await mongoose.connect(process.env.MONGO_URI);
console.log("DB connected");
//--
  const {fullName,location,skill,position,birth,gender,vision,PhoneNumber,CNIC_Number, email}=req.body;
  if(!req.file)
    return res.status(400).send("Image requried");
  if(!fullName|| !email)
    return res.status(400).send("Missing requeid feilds")
  const imagePath = req.file ? req.file.path : null;
  const formSchema= new form_Schema({
    fullName,
    location,
    skill,
    position,
    birth,
    gender,
    vision,
    PhoneNumber,
    CNIC_Number,
    email,
    image: imagePath,   // yahan path save ho raha hai
  });
   await formSchema.save();
  //  alert("Data enter successfully")
   res.redirect("/?success=true");
   res.send("Form submitted successfully");
}  catch(error)
{
res.status(500).send(error.message);
}
  console.log("data Saved");  
  
});

// server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

