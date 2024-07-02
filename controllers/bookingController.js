import Booking from "../models/Booking.js"
import { stripe } from "../index.js";
import User from "../models/User.js";

// checkout api
export const checkoutBooking = async (req, res, next) => {
    //console.log("req.body", req.body)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",

            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: req.body.hotelName,
                        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxob3RlbHxlbnwwfDB8MHx8fDI%3D"]
                    },
                    unit_amount: (req.body.price) * 100
                },
                quantity: 1
            }],

            shipping_address_collection: {
                allowed_countries: ['IN'],
            },

            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,

            consent_collection: {
                terms_of_service: 'required',
            },

            custom_text: {
                shipping_address: {
                    message: 'CARD INFORMATION: CARD NUMBER = "4242 4242 4242"..........MM/YY = "Add any month and year of the future"..........CVC = "Any 3 digit number"'
                },
                terms_of_service_acceptance: {
                    message: 'I agree to the [Terms of Service](https://example.com/terms)',
                },

            },

        });
        //console.log("session", session)
        if (session) {
            const newBooking = new Booking({ bookingId: session.id, ...req.body })
            try {
                const savedBooking = await newBooking.save()
                await User.findByIdAndUpdate(req.user.id, { $push: { bookings: savedBooking._id } })
            } catch (error) {
                console.log(error)
            }
        }
        res.json({ id: session.id, session })

    } catch (error) {
        console.log(error)
    }

}

export const createBooking = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id)
        //console.log("session", session.id, session.shipping_details.address, session.status)

        try {
            await Booking.updateOne({ bookingId: session.id }, { $set: { status: session.status, address: session.shipping_details.address } }, { upsert: true })

            res.status(200).json(session.id)
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
        res.status(404).json(error.raw.message)
    }
}

export const cancelBooking = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.id)

        try {

            const deletedBooking = await Booking.findOneAndDelete({ bookingId: session.id })
            await User.findByIdAndUpdate(req.user.id, { $pull: { bookings: deletedBooking._id } })

            const expireSession = await stripe.checkout.sessions.expire(req.params.id);
            res.status(200).json(expireSession.id)
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        await stripe.checkout.sessions.expire(req.params.id);
        console.log(error)
        res.status(404).json(error.raw.message)
    }
}


export const getBooking = async (req, res, next) => {
    try {
        const getBookings = await Booking.findOne({ bookingId: req.params.id }).populate("roomId")
        res.status(200).json(getBookings)
    } catch (error) {
        console.log(error)
    }
}


export const getAllBooking = async (req, res, next) => {
    try {
        const getAllBookings = await Booking.find({})
        res.status(200).json(getAllBookings)
    } catch (error) {
        console.log(error)
    }
}


export const getUserBookings = async (req, res, next) => {
    try {
        let user = await User.findById({ _id: req.user.id }).populate("bookings").select("-password")
        if (user.bookings.length > 0) {
            user.bookings.map(async (item) => {
                if (item.status == "open") {
                    console.log("status open", item._id)
                    await Booking.findByIdAndDelete({ _id: item._id })
                    await User.findByIdAndUpdate(req.user.id, { $pull: { bookings: item._id } })
                }
            })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}


export const removeOpenStatusBookings = async (req, res, next) => {
    const user = await User.findById({ _id: req.user.id }).populate("bookings").select("-password")
    user.bookings.map(async (item) => {
        if (item.status == "open") {
            console.log("status open", item._id)
            await Booking.findByIdAndDelete({ _id: item._id })
            await User.findByIdAndUpdate(req.user.id, { $pull: { bookings: item._id } })
        }
    })
    res.status(200).json("Removed booking with open status")
}


export const removeCancelThenSuccessBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({})
        bookings.map(async (it) => {
            if (!it.adults) {
                console.log(it._id)
                await Booking.findByIdAndDelete({ _id: it._id })
            }
        })
        res.status(200).json("Removed Cancel then Success Bookings")
    } catch (error) {
        console.log(error)
    }
}