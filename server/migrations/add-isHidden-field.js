require("dotenv").config();
const mongoose = require('mongoose');
const Product = require('../models/Product');


async function addIsHiddenField() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await Product.updateMany(
      { isHidden: { $exists: false } },
      { $set: { isHidden: false } }
    );

    console.log(`Updated ${result.modifiedCount} products`);
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.disconnect();
  }
}

addIsHiddenField();
