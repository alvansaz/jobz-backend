import { companyModel, jobModel } from "../models/index.js";

const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error getting jobs:", error);
    res.status(500).json({ error: "Failed to get jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await jobModel.getJobById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ error: "Failed to get job" });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = req.body;

    const company = await companyModel.getCompanyById(jobData.companyId);
    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const newJob = await jobModel.createJob(jobData);
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = req.body;

    const company = await companyModel.getCompanyById(jobData.companyId);
    if (!company) {
      return res.status(400).json({ error: "Company not found" });
    }

    const updatedJob = await jobModel.updateJob(jobId, jobData);
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await jobModel.getJobById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await jobModel.deleteJob(jobId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
