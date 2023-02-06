import mongoose from "mongoose";
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.Promise = global.Promise
