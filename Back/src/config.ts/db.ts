import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        const url = `${connection.host} :${connection.port}` 

        console.log(` MongoDB conectado ${url}` )
        
    } catch (error) {
        console.log(error)
    }
}