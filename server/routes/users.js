import express from "express" ;
import { getUser , getUserFriends , addRemoveFriends } from "../controllers/users.js" ;
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router() ;

router.get("/:userId",verifyToken,getUser);

router.get("/:userId/friends",verifyToken,getUserFriends) ;

router.patch("/:userId/:friendId",verifyToken,addRemoveFriends) ;

export default router;
