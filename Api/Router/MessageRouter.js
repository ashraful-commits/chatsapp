import express from 'express'
import { createMessage, deleteMessage, getAllMessage, getSpacificUserData } from '../Controllers/MessageControllers.js'

const messageRouter = express.Router()


messageRouter.route("/").post(createMessage)
messageRouter.route("/:id").get(getSpacificUserData)
messageRouter.route("/:id").delete(deleteMessage)

export default messageRouter