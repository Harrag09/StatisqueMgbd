import jwt from "jsonwebtoken";
import { connectToDatabase, client as dbConfig  } from "../config/dbConfig.js";
import dotenv from "dotenv";
import { ObjectId } from 'mongodb'; 

dotenv.config();

export const signin = async (req, res) => {
  const secretKey = process.env.ACCESS_TOKEN2;

  try {
    const { Login, Password } = req.body;
    const db = await connectToDatabase();
    const collection = db.collection('user');
    const response = await collection.findOne({ Login, Password });
    
    if (!response) {
      console.log("User not found");
      return res.status(200).json({
        msg: "User does not exist.",
        success: false,
      });
    }

    else {
     
      const access_token = jwt.sign(
        { id: response._id, isAdmin: false },
        secretKey,
        {}
      );
      res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
      });
      const user = response;
      res.cookie("loggedIn", "loggedIn");
      res.cookie("idCRM", user.idCRM);
      res.cookie("idUser", user._id.toString());

      return res.status(200).json({
        msg: "User found.",
        success: true,
        data: response[0],
      });
    }
  } catch (err) {
    res.status(500).json({ msg: err?.message, success: false });
  }
};




export const getUserById = async (req, res) => {
  const userId = req.cookies.idUser;

  const _id = new ObjectId(userId); //
  const db = await connectToDatabase();
  const collection = db.collection('user');
  try {

  

    const response = await collection.findOne({ _id});
    if (!response) {
      console.log("User not found");
      return res.status(404).json({
        msg: "User not found.",
        success: false,
      });
    }

    const user = response;

    return res.status(200).json({
      msg: "User found.",
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ msg: err?.message, success: false });
  }
};
