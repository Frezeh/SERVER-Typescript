import { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getAllProductHandler,
} from "./controller/product.controller";
import {
  viewAllFixturesHandler,
  addFixturesHandler,
  viewPendingFixturesHandler,
  viewCompletedFixturesHandler,
  updateFixtureHandler,
  viewUniquefixtureHandler,
  deleteOneFixtureHandler,
  deleteAllFixtureHandler,
} from "./controller/fixture.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createFixtureSchema,
  deleteFixtureSchema,
  getUniqueFixtureSchema,
  updateFixtureSchema,
} from "./schema/fixture.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import {
  addTeamHandler,
  deleteAllTeamHandler,
  deleteOneTeamHandler,
  updateTeamHandler,
  viewAllTeamHandler,
  viewTeamHandler,
} from "./controller/team.controller";
import {
  createTeamSchema,
  deleteTeamSchema,
  getTeamSchema,
  updateTeamSchema,
} from "./schema/team.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get("/api/products/", requireUser, getAllProductHandler);

  app.get(
    "/api/products/:productId",
    [requireUser, validateResource(getProductSchema)],
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  app.get("/api/fixtures", requireUser, viewAllFixturesHandler);

  app.post(
    "/api/fixtures",
    [requireUser, validateResource(createFixtureSchema)],
    addFixturesHandler
  );

  app.delete("/api/fixtures", requireUser, deleteAllFixtureHandler);

  app.get(
    "/api/fixtures/:slug",
    [requireUser, validateResource(getUniqueFixtureSchema)],
    viewUniquefixtureHandler
  );

  app.put(
    "/api/fixtures/:fixtureId",
    [requireUser, validateResource(updateFixtureSchema)],
    updateFixtureHandler
  );

  app.delete(
    "/api/fixtures/:fixtureId",
    [requireUser, validateResource(deleteFixtureSchema)],
    deleteOneFixtureHandler
  );

  app.get(
    "/api/fixtures/status/pending",
    requireUser,
    viewPendingFixturesHandler
  );

  app.get(
    "/api/fixtures/status/completed",
    requireUser,
    viewCompletedFixturesHandler
  );

  app.get("/api/teams", requireUser, viewAllTeamHandler);

  app.post(
    "/api/teams",
    [requireUser, validateResource(createTeamSchema)],
    addTeamHandler
  );

  app.delete("/api/teams", requireUser, deleteAllTeamHandler);

  app.get(
    "/api/teams/:teamId",
    [requireUser, validateResource(getTeamSchema)],
    viewTeamHandler
  );

  app.put(
    "/api/teams/:teamId",
    [requireUser, validateResource(updateTeamSchema)],
    updateTeamHandler
  );

  app.delete(
    "/api/teams/:teamId",
    [requireUser, validateResource(deleteTeamSchema)],
    deleteOneTeamHandler
  );
}

export default routes;
