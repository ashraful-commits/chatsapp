import express from 'express'
import { createChat, getChat, getSingleChat } from '../Controllers/ChatController.js'

const chatRouter = express.Router()


chatRouter.route("/:senderId/:receiverId").get(getChat)
chatRouter.route("/").post(createChat)
chatRouter.route("/:senderId").get(getSingleChat)

export default chatRouter