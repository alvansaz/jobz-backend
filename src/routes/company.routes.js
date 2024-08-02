import express from "express";
import multer from "multer";
const router = express.Router();
import { companyController } from "../controllers/index.js";

router.get("/", companyController.getCompanies);

router.get("/:id", companyController.getCompanyById);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("logo"), companyController.createCompany);

export default router;
