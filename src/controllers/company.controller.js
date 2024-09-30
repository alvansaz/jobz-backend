import fs from 'fs'
import path from 'path'
import Company from '../models/company.model.js';
import cloudinary from '../config/cloudinary.js';

async function getCompanies(req, res) {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCompanyById(req, res) {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCompany(req, res) {
  try {
    let logoUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      logoUrl = result.secure_url;
    }

    // Delete the file from the local filesystem
    fs.unlinkSync(path.resolve(req.file.path));

    const companyData = {
      ...req.body,
      logo: logoUrl,
    };

    const company = new Company(companyData);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getCompanies,
  getCompanyById,
  createCompany,
};