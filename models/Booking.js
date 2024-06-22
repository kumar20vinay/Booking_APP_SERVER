import mongoose from "mongoose";
const { Schema } = mongoose

const BookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checkinDate: {
        type: String,
        required: true
    },
    checkoutDate: {
        type: String,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    pets: {
        type: Number,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "open"
    },
    address: {
        city: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        line1: {
            type: String,
            required: false
        },
        line2: {
            type: String,
            required: false
        },
        postal_code: {
            type: Number,
            required: false
        },
        state: {
            type: String,
            required: false
        },
    }
}, { timestamps: true }
)

export default mongoose.model("Booking", BookingSchema)