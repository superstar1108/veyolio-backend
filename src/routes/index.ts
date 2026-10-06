import { Router } from "express";
import health from "../modules/health/health.routes";
import contact from "../modules/contact/contact.routes";
import applications from "../modules/applications/applications.routes";

// Register each feature module here.
const router = Router();

router.use("/health", health);
router.use("/contact", contact);
router.use("/applications", applications);

export default router;
