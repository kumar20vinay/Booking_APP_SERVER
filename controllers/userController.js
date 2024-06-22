import User from "../models/User.js";
import bcrypt from "bcryptjs";


//UPDATE user
export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            var updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: {...req.body, password:hash} }, { new: true })
        }else{
            var updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: true })
        }
        const { password, ...others } = updatedUser._doc
        res.status(200).json(others);

    } catch (err) {
        console.log(err)
        next(err);
    }
}

//DELETE User
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");

    } catch (err) {
        next(err);
    }
}

//GET User
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate("bookings");
        const { password, ...others } = user._doc
        res.status(200).json(others);

    } catch (err) {
        next(err);
    }
}


//GET ALL users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        next(err);
    }
}
