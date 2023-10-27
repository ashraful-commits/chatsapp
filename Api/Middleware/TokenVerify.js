import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import UserModel from "../Model/UserModel.js";

export const TokenVerify = (req, res, next) => {
  const accessToken = req.cookies.authToken;
 
  if (!accessToken) {
    return res.status(404).json("User not logged in");
  }

  jwt.verify(accessToken, process.env.JWT_SECRECT, AsyncHandler(async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const me = await UserModel.findOne({ email: decode?.email });

    if (!me) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    req.me = me;
    next();
  }));
}
