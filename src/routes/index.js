import { Router } from "express";
const router = Router();
import jobRoutes from "./job.routes.js";
import companyRoutes from "./company.routes.js";

router.use("/jobs", jobRoutes);
router.use("/companies", companyRoutes);

export default router;
