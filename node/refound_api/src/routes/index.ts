import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./session-routes";
import { refundsRoutes } from "./refunds-routes";
import { uploadsRoutes } from "./uploads-routes";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)



routes.use(ensureAuthenticated)
routes.use("/refunds", refundsRoutes)
routes.use("/uploads", uploadsRoutes)

export { routes }