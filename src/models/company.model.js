import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getCompanies = async () => {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    throw error;
  }
};

const getCompanyById = async (companyId) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    return company;
  } catch (error) {
    throw error;
  }
};

const createCompany = async (data) => {
  try {
    if (!data.title || !data.email || !data.description) {
      throw new Error("Title, email and description are required");
    }
    const company = await prisma.company.create({ data });
    return company;
  } catch (error) {
    throw error;
  }
};

export default {
  getCompanies,
  getCompanyById,
  createCompany,
};
