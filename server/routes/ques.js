import express from "express" ;
import { getFeedQues , getSpecificQues , upvote , downvote , ansQues } from "../controllers/ques.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router() ;

router.get("/",verifyToken,getFeedQues);

router.get("/:quesId",verifyToken , getSpecificQues) ;

router.patch("/:quesId/:answerId/upvote",verifyToken,upvote);

router.patch("/:quesId/:answerId/downvote",verifyToken,downvote);

router.put("/:quesId/answer",verifyToken,ansQues);

export default router;


