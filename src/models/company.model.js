import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  population: { type: String },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

const Company = mongoose.model("Company", companySchema);

export default Company;
