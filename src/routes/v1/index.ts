import { Router } from "express";
const router: Router = Router();
import TodoRoute from "./todos/routes";

router.use("/todos", TodoRoute);

export default router;
