const express = require("express");
const dotenv = require("dotenv");
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const productRouter = require('./routes/product.js')
const blogRouter = require('./routes/blog.js')
const roomRouter = require('./routes/room.js')
const hotelRouter = require('./routes/hotel.js')

const messageRouter = require('./routes/message.js')
const gigRouter = require('./routes/gig.js')
const orderRouter = require('./routes/order.js')
const conversationRouter = require('./routes/conversation.js')
const reviewRouter = require('./routes/review.js')


const morgan = require('morgan')
const formidableMiddleware = require('express-formidable');
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const dbConnect = require("./config/dbConnect.js");
const { notFound, errorHandler } = require("./middleware/errorhandler.js");
const cookieParser = require('cookie-parser')
const ErrorHandler = require('./middleware/error.js');
dotenv.config();

dbConnect();

const app = express();

    //     //middlewares
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("uploads"));

    //     app.use(formidableMiddleware());


    //     // router middleware
app.use("/api/auth", authRouter);
// app.use("/api", productRouter);
// app.use("/api", blogRouter);
// app.use("/api", roomRouter);
// app.use("/api", hotelRouter);
app.use("/api/messages", messageRouter);
app.use("/api/gig", gigRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use(notFound)
app.use(ErrorHandler);
app.use(cookieParser())


const port = process.env.PORT || 5000;



    app.listen(port, () => {
            console.log(`Node server is running on ${port}`);
        })
    