import express from "express";
import { getLivestatById, updateLivestat } from "../controllers/livestatsController.js";
import { verifyAccessToken } from "../utils/verifyToken.js";

const livestatsRoutes = express.Router();
//

livestatsRoutes.get("/livestats",[verifyAccessToken], getLivestatById);
livestatsRoutes.post("/Update", updateLivestat);


export default livestatsRoutes;

