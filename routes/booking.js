import express from "express";
import {cancelBooking, checkoutBooking, createBooking, getAllBooking, getBooking, getUserBookings, removeOpenStatusBookings, removeCancelThenSuccessBookings} from "../controllers/bookingController.js"
import {verifyUser, verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router()


router.post("/create-checkout-session", verifyUser, checkoutBooking)

router.post("/createBooking/:id", verifyUser, createBooking)

router.post("/cancelBooing/:id", verifyUser, cancelBooking)

router.get("/getBooking/:id", verifyUser, getBooking)

router.get("/getAllBooking", verifyAdmin, getAllBooking)
router.get("/removeOpenStatusBookings", verifyAdmin, removeOpenStatusBookings)

router.get("/getUserBookings", verifyUser, getUserBookings)
router.get("/removeCancelThenSuccessBookings", verifyUser, removeCancelThenSuccessBookings)


export default router