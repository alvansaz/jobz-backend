import { companyModel } from "../models/index.js";

const getCompanies = async (req, res) => {
  try {
    const companies = await companyModel.getCompanies();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error getting companies:", error);
    res.status(500).json({ error: "Failed to get companies" });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await companyModel.getCompanyById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting company:", error);
    res.status(500).json({ error: "Failed to get company" });
  }
};

const createCompany = async (req, res) => {
  try {
    console.log("File:", req.file);
    const companyData = req.body;
    console.log("Company data:", companyData);
    const logo = req.file;
    // Access file information
    const logoPath = logo.path; // Path to the stored file
    const logoFilename = logo.filename;
    const newCompany = await companyModel.createCompany({
      ...companyData,
      logo: req.file.path, // Store the file ID in the database
    });
    console.log("New company:", newCompany);

    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error); // Log the error
    res.status(500).json({ error: "Failed to create company" });
  }
};

// Add other controller functions for getting, updating, deleting companies as needed

export default {
  getCompanies,
  getCompanyById,
  createCompany,
};
