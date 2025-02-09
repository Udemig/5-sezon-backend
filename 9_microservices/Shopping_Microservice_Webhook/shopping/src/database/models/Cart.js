const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: String,
    items: [
      {
        product: {
          _id: { type: String, required: true },
          name: String,
          desc: String,
          banner: String,
          type: String,
          unit: Number,
          price: Number,
          available: Boolean,
          suplier: String,
        },
        unit: { type: Number, required: true },
      },
    ],
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
