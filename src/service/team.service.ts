import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TeamModel, { TeamInput, TeamDocument } from "../models/team.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const addTeam = async (input: TeamInput) => {
  const metricsLabels = {
    operation: "postTeam",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await TeamModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export const viewAllTeams = async (
  query: FilterQuery<TeamDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "getAllTeams",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await TeamModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export async function findTeam(
  query: FilterQuery<TeamDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findTeam",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await TeamModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateTeam(
  query: FilterQuery<TeamDocument>,
  update: UpdateQuery<TeamDocument>,
  options: QueryOptions
) {
  return TeamModel.findOneAndUpdate(query, update, options);
}

export async function deleteOneTeam(query: FilterQuery<TeamDocument>) {
  return TeamModel.deleteOne(query);
}

export async function deleteAllTeam(query: FilterQuery<TeamDocument>) {
  return TeamModel.deleteMany(query);
}
