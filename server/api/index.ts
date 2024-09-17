import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from '../routes/auth/auth-routes';
import adminProductsRouter from '../routes/admin/products-routes';
import adminOrderRouter from '../routes/admin/order-routes';
import shopProductsRouter from '../routes/shop/products-routes';
import shopCartRouter from '../routes/shop/cart-routes';
import shopAddressRouter from '../routes/shop/address-routes';
import shopOrderRouter from '../routes/shop/order-routes';
import shopSearchRouter from '../routes/shop/search-routes';
import shopReviewRouter from '../routes/shop/review-routes';
import commonFeatureRouter from '../routes/common/feature-routes';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string)
  

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);



export default app