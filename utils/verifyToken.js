import jwt from "jsonwebtoken";
import { createError } from "./error.js";


//verify user function
export const verifyUser = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ msg: "Not authorized. No token" })

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(createError(403, "Token is not valid"))
            req.user = user;
            //console.log("verifyUser",req.user)
            if (req.user.id || req.user.isAdmin) {
                next();
            } else {
                return next(createError(403, "You are not authorized"))
            }
        })
    }

}


//verify admin function
export const verifyAdmin = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ msg: "Not authorized. No token" })

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(createError(403, "Token is not valid"))
            req.user = user;
            //console.log("verifyAdmin",req.user)
            if (req.user.isAdmin) {
                next();
            } else {
                return next(createError(403, "You are not authorized"))
            }
        })
    }

}


