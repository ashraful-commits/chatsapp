import express from "express"
import {  LoginUser, Logout, RegisterUser, UserUpdate, getAllUser, me } from "../Controllers/AuthController.js"
import { TokenVerify } from "../Middleware/TokenVerify.js"
const AuthRouter = express.Router()

AuthRouter.route("/").get(getAllUser).post(RegisterUser)
AuthRouter.route("/login").post(LoginUser)
AuthRouter.route("/me").get(TokenVerify,me)
AuthRouter.route("/:id").put(UserUpdate)
AuthRouter.route("/logout").get(Logout)
export default AuthRouter