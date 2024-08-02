import { Router } from "express";
const router = Router();
import { jobController } from "../controllers/index.js";

router.get("/", jobController.getJobs);

router.get("/:id", jobController.getJobById);

router.post("/", jobController.createJob);

router.put("/:id", jobController.updateJob);

router.delete("/:id", jobController.deleteJob);

export default router;
