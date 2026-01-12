import mongoose from "mongoose";

// Schema
const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    showDateTime: {
      type: Date,
      required: true
    },
    showPrice: {
      type: Number,
      required: true,
      min: 0
    },
    occupiedSeats: {
      type: Map,
      of: Boolean,
      default: {}
    }
  },
  { timestamps: true }
);

// Model
const Show = mongoose.model("Show", showSchema);
export default Show;
