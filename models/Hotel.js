import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    distance:{
        type: String,
        required:true
    },
    photos:{
        type: [String]
    },
    description:{
        type: String,
        required:true
    },
    rooms:[{
        type: mongoose.Types.ObjectId,
        ref: "Room",
        required:false
    }],
    cheapestPrice:{
        type: Number,
        required:true
    },
    featured:{
        type: Boolean,
        default: false
    }
})


export default mongoose.model("Hotel",HotelSchema);