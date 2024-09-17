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
const PORT = process.env.PORT || 5000;

const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: function (origin, callback) {
   
    const cleanOrigin = origin ? origin.replace(/\/$/, '') : '';
    if (!origin || cleanOrigin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Add a middleware to ensure correct CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  next();
});

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