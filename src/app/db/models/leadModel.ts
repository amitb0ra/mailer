import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
});

const leadModel = mongoose.models.leads || mongoose.model("Lead", leadSchema);

export default leadModel;
