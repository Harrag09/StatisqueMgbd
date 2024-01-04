import express from "express"
import { getuser } from "../controllers/usersController.js"

const usersRoutes = express.Router()

usersRoutes.get("/", getuser)


export default usersRoutes