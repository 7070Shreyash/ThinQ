import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/login.js";
import { createQues } from "./controllers/ques.js";
import { createBlog } from "./controllers/blogs.js";

import loginRoutes from "./routes/login.js";
import blogRoutes from "./routes/blogs.js";
import quesRoutes from "./routes/ques.js";
import userRoutes from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  
  app.post("/loginpage/register",upload.single("picture"),register); 

  app.post("/quespage/create",upload.single("picture"),createQues); 

  app.post("blogspage/create",upload.single("picture"),createBlog);

  app.use("/loginpage",loginRoutes);
  app.use("/blogspage",blogRoutes);
  app.use("/quespage",quesRoutes); 
  app.use("/users",userRoutes);


  const PORT = process.env.PORT || 6001 ;

  mongoose.set('strictQuery', true); // ignoring warning

  mongoose
    .connect(precess.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=> {
    app.listen(PORT,()=> console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect :(`));


