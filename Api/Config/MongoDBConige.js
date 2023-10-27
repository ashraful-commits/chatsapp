
import mongoose from "mongoose"


const MongoDBConnection =()=>{
    try {
       mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected successfully!`.bgMagenta.white)
    } catch (error) {
        console.log(error)
    }
}

export default MongoDBConnection