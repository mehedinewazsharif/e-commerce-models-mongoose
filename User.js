const mongoose = require('mongoose');
const CartItem = require('./CartItem');
const Order = require('./Order');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true, versionKey:false}
);

// Relationship with CartItem: When a user is deleted, remove associated cart items.
userSchema.pre('remove', async function (next) {
  await CartItem.deleteMany({ user: this._id });
  next();
});

// Relationship with Order: When a user is deleted, remove associated orders.
userSchema.pre('remove', async function (next) {
  await Order.deleteMany({ user: this._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
