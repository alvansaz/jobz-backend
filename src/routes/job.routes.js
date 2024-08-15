import { Router } from "express";
import { jobController } from "../controllers/index.js";

const router = Router();

router.get("/", jobController.getJobs);

router.get("/:id", jobController.getJobById);

router.post("/", jobController.createJob);

router.put("/:id", jobController.updateJob);

router.delete("/:id", jobController.deleteJob);

export default router;
