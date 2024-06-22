import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    type:{
        type: String,
        required:true
    },
    amenities:[{
        type: String,
        required:true
    }],
    complementary:[{
        type: String,
        required:true
    }],
    adults:{
        type: Number,
        required:true
    },
    children:{
        type: Number,
        required:false
    },
    description:{
        type: String,
        required: true
    }
},{timestamps:true }
);

export default mongoose.model("Room", RoomSchema);