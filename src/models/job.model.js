import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  seniority: { type: String, required: true },
  salary: { type: Number, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  remotePossibility: { type: Boolean, required: true },
  immediateRequirement: { type: Boolean, required: true },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
