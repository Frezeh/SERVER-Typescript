import { Request, Response } from "express";
import { CreateTeamInput, ReadTeamInput, UpdateTeamInput } from "../schema/team.schema";
import {
  addTeam,
  findTeam,
  viewAllTeams,
  findAndUpdateTeam,
  deleteOneTeam,
  deleteAllTeam,
} from "../service/team.service";

export async function addTeamHandler(
  req: Request<{}, {}, CreateTeamInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const team = await addTeam({ ...body, creator: userId });

  return res.send(team);
}

export async function viewAllTeamHandler(req: Request, res: Response) {
  const query = req.query;

  const team = await viewAllTeams(query);

  return res.send(team);
}

export async function viewTeamHandler(
  req: Request<ReadTeamInput["params"]>,
  res: Response
) {
  const teamId = req.params.teamId;

  const team = await findTeam({ _id: teamId });

  return res.send(team);
}

export async function updateTeamHandler(
  req: Request<UpdateTeamInput["params"]>,
  res: Response
) {
  const teamId = req.params.teamId;
  const update = req.body;

  const team = await findTeam({ _id: teamId });

  if (!team) {
    return res.sendStatus(404);
  }

  const updatedTeam = await findAndUpdateTeam({ _id: teamId }, update, {
    new: true,
  });

  return res.send(updatedTeam);
}

export async function deleteOneTeamHandler(
  req: Request<UpdateTeamInput["params"]>,
  res: Response
) {
  const teamId = req.params.teamId;

  const team = await findTeam({ _id: teamId });

  if (!team) {
    return res.sendStatus(404);
  }

  await deleteOneTeam({ _id: teamId });

  return res.sendStatus(200);
}

export async function deleteAllTeamHandler(req: Request, res: Response) {
  await deleteAllTeam({});

  return res.sendStatus(200);
}
