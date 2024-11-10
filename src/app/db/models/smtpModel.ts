import mongoose from "mongoose";

const SmtpSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  secure: {
    type: Boolean,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const smtpModel = mongoose.models.smtps || mongoose.model("Smtp", SmtpSchema);

export default smtpModel;
