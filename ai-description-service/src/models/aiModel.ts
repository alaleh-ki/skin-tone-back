import { Schema, model } from "mongoose";

const DescriptionSchema = new Schema({
  tone: String,
  palette: Object,
  response: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Description", DescriptionSchema);
