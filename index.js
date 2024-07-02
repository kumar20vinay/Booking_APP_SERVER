import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingsRoute from "./routes/booking.js"
import cors from "cors";


dotenv.config()
const app = express()

import Stripe from "stripe"
export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)


//connection to mongoDB(credentials are in .env file)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        throw error
    }
};

//if connected to mongodb, this line will be shown
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})

// if disconnected from mongodb, this line will be shown
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

//middlewares
app.set("trust proxy", 1)

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.get("/", (req, res) => {
    res.send("welcome")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connect();
    console.log("Server has been started successfully")
})
