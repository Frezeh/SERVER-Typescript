import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FixtureModel, {
  FixtureDocument,
  FixtureInput,
} from "../models/fixture.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const addFixtures = async (input: FixtureInput) => {
  const metricsLabels = {
    operation: "postFixtures",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export const viewAllFixtures = async (
  query: FilterQuery<FixtureDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "getAllFixtures",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export const viewUniquefixture = async (
  query: FilterQuery<FixtureDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "getUniqueFixture",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export const viewPendingFixtures = async (
  query: FilterQuery<FixtureDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "getPendingFixtures",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.find({ status: "pending" });
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export const viewCompletedFixtures = async (
  query: FilterQuery<FixtureDocument>,
  options: QueryOptions = { lean: true }
) => {
  const metricsLabels = {
    operation: "getCompletedFixtures",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
};

export async function findFixture(
  query: FilterQuery<FixtureDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findFixture",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await FixtureModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateFixture(
  query: FilterQuery<FixtureDocument>,
  update: UpdateQuery<FixtureDocument>,
  options: QueryOptions
) {
  return FixtureModel.findOneAndUpdate(query, update, options);
}

export async function deleteOneFixture(query: FilterQuery<FixtureDocument>) {
  return FixtureModel.deleteOne(query);
}

export async function deleteAllFixtures(query: FilterQuery<FixtureDocument>) {
  return FixtureModel.deleteMany(query);
}
