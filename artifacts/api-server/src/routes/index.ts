import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import quotesRouter from "./quotes";
import adminAuthRouter from "./admin-auth";
import adminRouter from "./admin";
import portalAuthRouter from "./portal-auth";
import portalRouter from "./portal";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(quotesRouter);
router.use(storageRouter);
router.use(portalAuthRouter);
router.use(portalRouter);
router.use(adminAuthRouter);
router.use(adminRouter);

export default router;
