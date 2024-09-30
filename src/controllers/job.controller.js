import Company from "../models/company.model.js";
import Job from "../models/job.model.js";

async function getJobs(req, res) {
  try {
    const jobs = await Job.find().populate({
      path: "companyId",
      select: "_id title logo",
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error getting jobs:", error);
    res.status(500).json({ error: "Failed to get jobs" });
  }
}

async function getJobById(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ error: "Failed to get job" });
  }
}

async function createJob(req, res) {
  try {
    const jobData = req.body;
    const company = await Company.findById(jobData.companyId);

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const newJob = new Job(jobData);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
}

async function updateJob(req, res) {
  try {
    const jobId = req.params.id;
    const jobData = req.body;
    const company = await Company.findById(jobData.companyId);

    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
}

async function deleteJob(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await Job.findByIdAndDelete(jobId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
}

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
