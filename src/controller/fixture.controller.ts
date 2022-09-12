import { Request, Response } from "express";
import {
  CreateFixtureInput,
  DeleteFixtureInput,
  UniqueFixtureInput,
  UpdateFixtureInput,
} from "../schema/fixture.schema";
import {
  viewAllFixtures,
  viewPendingFixtures,
  addFixtures,
  viewCompletedFixtures,
  findAndUpdateFixture,
  findFixture,
  viewUniquefixture,
  deleteOneFixture,
  deleteAllFixtures,
} from "../service/fixture.service";

export async function addFixturesHandler(
  req: Request<{}, {}, CreateFixtureInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const fixture = await addFixtures({ ...body, creator: userId });

  return res.send(fixture);
}

export async function viewAllFixturesHandler(req: Request, res: Response) {
  const query = req.query;

  const fixture = await viewAllFixtures(query);

  return res.send(fixture);
}

export async function viewUniquefixtureHandler(
  req: Request<UniqueFixtureInput["params"]>,
  res: Response
) {
  const query = { slug: `${req.params.slug}` };

  const fixture = await viewUniquefixture(query);

  return res.send(fixture);
}

export async function viewPendingFixturesHandler(req: Request, res: Response) {
  const query = { status: "pending" };

  const fixture = await viewPendingFixtures(query);

  return res.send(fixture);
}

export async function viewCompletedFixturesHandler(
  req: Request,
  res: Response
) {
  const query = { status: "completed" };

  const fixture = await viewCompletedFixtures(query);

  return res.send(fixture);
}

export async function updateFixtureHandler(
  req: Request<UpdateFixtureInput["params"]>,
  res: Response
) {
  const fixtureId = req.params.fixtureId;
  const update = req.body;

  const fixture = await findFixture({ _id: fixtureId });

  if (!fixture) {
    return res.sendStatus(404);
  }

  const updatedFixture = await findAndUpdateFixture({ _id: fixtureId }, update, {
    new: true,
  });

  return res.send(updatedFixture);
}

export async function deleteOneFixtureHandler(
  req: Request<DeleteFixtureInput["params"]>,
  res: Response
) {
  const fixtureId = req.params.fixtureId;

  const fixture = await findFixture({ _id: fixtureId });

  if (!fixture) {
    return res.sendStatus(404);
  }

  await deleteOneFixture({ _id: fixtureId });

  return res.sendStatus(200);
}

export async function deleteAllFixtureHandler(req: Request, res: Response) {
  await deleteAllFixtures({});

  return res.sendStatus(200);
}
