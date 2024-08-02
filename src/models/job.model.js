import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getJobs = async () => {
  try {
    const jobs = await prisma.job.findMany();
    return jobs;
  } catch (error) {
    throw error;
  }
};

const getJobById = async (jobId) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });
    return job;
  } catch (error) {
    throw error;
  }
};

const createJob = async (data) => {
  try {
    const job = await prisma.job.create({ data });
    return job;
  } catch (error) {
    throw error;
  }
};

const updateJob = async (jobId, data) => {
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data,
    });
    return job;
  } catch (error) {
    throw error;
  }
};

const deleteJob = async (jobId) => {
  try {
    const job = await prisma.job.delete({
      where: { id: jobId },
    });
    return job;
  } catch (error) {
    throw error;
  }
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
